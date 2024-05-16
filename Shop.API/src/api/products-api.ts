import { Request, Response, Router } from 'express';
import {
    ICommentEntity,
    IImageEntity,
    ImageCreatePayload,
    ProductAddImagesPayload,
    ImagesRemovePayload,
    IProductEntity,
    IProductSearchFilter,
    ISimilarProductEntity,
    IAllSimilarProductsRemovePayload,
    ISimilarProductsRemovePayload
} from '../../types';
import { connection } from '../../index';
import { ioServer } from '../../../index';
import { mapCommentsEntity, mapImageEntity, mapImagesEntity, mapProductsEntity, mapSimilarProductsEntity } from '../services/mapping';
import { throwServerError, enhanceProductsComments, enhanceProductsImages, getProductsFilterQuery, checkArraysForMatchingValues } from '../helpers';
import { v4 as uuidv4 } from 'uuid';
import { OkPacket, RowDataPacket } from 'mysql2';
import {
    INSERT_PRODUCT_QUERY,
    INSERT_IMAGE_QUERY,
    DELETE_IMAGES_QUERY,
    REPLACE_PRODUCT_THUMBNAIL,
    UPDATE_PRODUCT_FIELDS,
    INSERT_SIMILAR_PRODUCT_QUERY,
    DELETE_SIMILAR_PRODUCTS_QUERY,
    DELETE_ALL_SIMILAR_PRODUCTS_QUERY
} from '../services/queries';
import { IProduct, ProductCreatePayload, ProductAddSimilar } from '@Shared/types';
import { param, body, validationResult } from "express-validator";

export const productsRouter = Router();

productsRouter.get('/', async (req: Request, res: Response) => {
    try {
        const [productRows] = await connection.query<IProductEntity[]> ('SELECT * FROM products');
        const [commentRows] = await connection.query<ICommentEntity[]> ('SELECT * FROM comments');
        const [imageRows] = await connection.query<IImageEntity[]> ('SELECT * FROM images');            //
    
        const products = mapProductsEntity(productRows);
        const withComments = enhanceProductsComments(products, commentRows);
        const withImages = enhanceProductsImages(withComments, imageRows);                              //
    
        res.send(withImages);
    } catch (e) {
        throwServerError(res, e);
    }
});

productsRouter.get('/search', async (req: Request<{}, {}, {}, IProductSearchFilter>, res: Response) => {
    try {

        if (!Object.keys(req.query).length) {
            res.status(400);
            res.send('Filter is empty');
            return;
        }

        const [query, values] = getProductsFilterQuery(req.query);
        const [rows] = await connection.query<IProductEntity[]> (query, values);

        if (!rows?.length) {
            res.status(404);
            res.send(`Products are not found`);
            return;
        }

        const [commentRows] = await connection.query<ICommentEntity[]> ('SELECT * FROM comments');
        const [imageRows] = await connection.query<IImageEntity[]> ('SELECT * FROM images');            //

        const products = mapProductsEntity(rows);
        const withComments = enhanceProductsComments(products, commentRows);
        const withImages = enhanceProductsImages(withComments, imageRows);                              //

        res.send(withImages);
    } catch (e) {
        throwServerError(res, e);
    }
});   

productsRouter.get('/:id', async (req: Request<{ id: string }>, res: Response) => {
    try {
        const [rows] = await connection.query<IProductEntity[]> (
            'SELECT * FROM products WHERE product_id = ?',
            [req.params.id]
        );

        if (!rows?.[0]) {   // Чтобы выполнить проверку на существование самого rows через знак ? и нужна точка
            res.status(404);
            res.send(`Product with id ${req.params.id} is not found`);
            return;
        }

        const [comments] = await connection.query<ICommentEntity[]> (
            'SELECT * FROM comments WHERE product_id = ?',
            [req.params.id]
        );

        const [images] = await connection.query<IImageEntity[]> (               //
            'SELECT * FROM images WHERE product_id = ?',                        //
            [req.params.id]                                                     //
        );                                                                      //

        const product = mapProductsEntity(rows)[0]; // Нам функция mapProductsEntity возвращает массив, но т.к. здесь всего один элемент мы и берем у возвращаемого массива нулевой

        if (comments.length) {
            product.comments = mapCommentsEntity(comments); // Можно было бы выше и не писать (rows)[0] а написать просто (rows), а здесь тогда product[0].comments
        }

        if (images.length) {                                                    //
            product.images = mapImagesEntity(images);                           //
            images.forEach((image) => {                                         //
                image.main ? product.thumbnail = mapImageEntity(image) : null   //
            });                                                                 //
        }                                                                       //

        res.send(product);
    } catch (e) {
        throwServerError(res, e);
    }
});

productsRouter.post('/', async (req: Request<{}, {}, ProductCreatePayload>, res: Response) => {
    try {
        const { title, description, price, images } = req.body;
        const id = uuidv4();
        await connection.query<OkPacket> (
            INSERT_PRODUCT_QUERY,
            [id, title || null, description || null, price || null]
        );

        if (images) {                                                   //
            for (let i = 0; i < images.length; i++) {                   //
                const imageId = uuidv4();                               //
                await connection.query<OkPacket> (                      //
                    INSERT_IMAGE_QUERY,                                 //
                    [[[imageId, id, images[i].main, images[i].url]]]    //
                );                                                      //
            }                                                           //
        }                                                               //

        const [productRow] = await connection.query<IProductEntity[]> (
            'SELECT * FROM products WHERE product_id = ?',
            [id]
        );

        const createdProduct = mapProductsEntity(productRow)[0];

        const [products] = await connection.query<RowDataPacket[]> ("SELECT * FROM products");
        ioServer.emit('update products count', products?.length || 0);

        res.status(201);
        res.send(createdProduct);
        //res.send(`Product id:${id} has been added!`);
    } catch (e) {
        throwServerError(res, e);
    }
});

productsRouter.post('/add-images', async (req: Request<{}, {}, ProductAddImagesPayload>, res: Response) => {  // ЦЕЛИКОМ
    try {
        const { productId, images } = req.body;

        if (!images?.length) {
            res.status(400);
            res.send('Images array is empty');
            return;
        }

        const [rows] = await connection.query<IProductEntity[]> (
            'SELECT * FROM products WHERE product_id = ?',
            [productId]
        );

        if (!rows[0]) {
            res.status(404);
            res.send(`Product with id ${productId} is not found`);
            return;
        }

        if (images) {
            for (let i = 0; i < images.length; i++) {
                const imageId = uuidv4();
                await connection.query<OkPacket> (
                    INSERT_IMAGE_QUERY,
                    [[[imageId, productId, images[i].main, images[i].url]]]
                );
            }
        }

        res.status(201);
        res.send(`Product id:${productId} images have been added!`);
    } catch (e) {
        throwServerError(res, e);
    }
});

productsRouter.post('/update-thumbnail/:id',
    [
        param('id').isUUID().withMessage('Product id is not UUID'),
        body('newThumbnailId').isUUID().withMessage('New thumbnail id is not UUID'),
    ],
    async (req: Request<{ id: string }, {}, {newThumbnailId: string}>, res: Response) => {  // ЦЕЛИКОМ
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400);
            res.json({ errors: errors.array() });
            return;
        }

        const [currentThumbnailRows] = await connection.query<IImageEntity[]>(
            "SELECT * FROM images WHERE product_id=? AND main=?",
            [req.params.id, 1]
          );

        if (!currentThumbnailRows?.length || currentThumbnailRows.length > 1) {
            res.status(400);
            res.send("Incorrect product id");
            return;
        }

        const [newThumbnailRows] = await connection.query<IImageEntity[]>(
            "SELECT * FROM images WHERE product_id=? AND image_id=?",
            [req.params.id, req.body.newThumbnailId]
        );

        if (newThumbnailRows?.length !== 1) {
            res.status(400);
            res.send("Incorrect new thumbnail id");
            return;
        }

        const currentThumbnailId = mapImageEntity(currentThumbnailRows[0]).id;
        const [info] = await connection.query<OkPacket>(
            REPLACE_PRODUCT_THUMBNAIL,
            [currentThumbnailId, req.body.newThumbnailId, currentThumbnailId, req.body.newThumbnailId]
        );

        if (info.affectedRows === 0) {
            res.status(404);
            res.send("No one image has been updated");
            return;
        }

        res.status(200);
        res.send('New product thumbnail has been set!');
    } catch (e) {
        throwServerError(res, e);
    }
});

productsRouter.post('/remove-images', async (req: Request<{}, {}, ImagesRemovePayload>, res: Response) => {    // ЦЕЛИКОМ
    try {
        const imagesToRemove = req.body;

        if (!imagesToRemove?.length) {  // Знак ? нужен чтобы определить передан ли вообще объект в запрос, а не только то что он пуст внутри - аналогично везде выше так же
            res.status(400);
            res.send('Images array is empty');
            return;
        }

        const [info] = await connection.query<OkPacket>(DELETE_IMAGES_QUERY, [[imagesToRemove]]);

        if (info.affectedRows === 0) {
            res.status(404);
            res.send("No one image has been removed");
            return;
        }

        res.status(201);
        res.send('Images have been removed!');
    } catch (e) {
        throwServerError(res, e);
    }
});

productsRouter.patch('/:id', async (req: Request<{ id: string }, {}, ProductCreatePayload>, res: Response) => {
    try {
        const { id } = req.params;
        
        const [rows] = await connection.query<IProductEntity[]> (
            'SELECT * FROM products WHERE product_id = ?',
            [id]
        );

        if (!rows?.[0]) {
            res.status(404);
            res.send(`Product with id ${id} is not found`);
            return;
        }

        let updateQuery = "UPDATE products SET ";

        const valuesToUpdate = [];
        ['title', 'description', 'price'].forEach(fieldName => {
            if (req.body.hasOwnProperty(fieldName)) {
                if (valuesToUpdate.length) {
                    updateQuery += ', ';
                }

                updateQuery += `${fieldName} = ?`;
                valuesToUpdate.push(req.body[fieldName]);
            }
        });

        updateQuery += ' WHERE product_id = ?';
        valuesToUpdate.push(req.params.id);

        await connection.query<OkPacket> (updateQuery, valuesToUpdate);

        // const currentProduct = rows[0];
        // await connection.query<OkPacket>(
        //     UPDATE_PRODUCT_FIELDS,
        //     [
        //       req.body.hasOwnProperty("title") ? req.body.title : currentProduct.title,
        //       req.body.hasOwnProperty("description") ? req.body.description : currentProduct.description,
        //       req.body.hasOwnProperty("price") ? req.body.price : currentProduct.price,
        //       id
        //     ]
        // );

        res.status(200);
        res.send(`Product with id:${req.params.id} has been update`)
    } catch (e) {
        throwServerError(res, e);
    }
});

productsRouter.delete('/:id', async (req: Request<{ id: string }>, res: Response) => {
    try {
        console.log('Удаляем ', req.params.id)

        const [rows] = await connection.query<IProductEntity[]> (           //
            'SELECT * FROM products WHERE product_id = ?',                  //
            [req.params.id]                                                 //
        );                                                                  //

        if (!rows[0]) {                                                     //
            res.status(404);                                                //
            res.send(`Product with id ${req.params.id} is not found`);      //
            return;                                                         //
        }                                                                   //

        await connection.query<OkPacket> (                  //
            'DELETE FROM comments WHERE product_id = ?',    //
            [req.params.id]                                 //
        );                                                  //

        await connection.query<OkPacket> (                  //
            'DELETE FROM images WHERE product_id = ?',      //
            [req.params.id]                                 //
        );                                                  //

        await connection.query<OkPacket> (
            'DELETE FROM similar WHERE product_id = ?',
            [req.params.id]
        );

        await connection.query<OkPacket> (
            'DELETE FROM products WHERE product_id = ?',
            [req.params.id]
        );

        res.status(200);
        res.end();
    } catch (e) {
        throwServerError(res, e);
    }
});

//====================== ИТОГОВОЕ ПРАКТИЧЕСКОЕ ЗАДАНИЕ ======================
productsRouter.get('/similar-product/:id', async (req: Request<{ id: string }>, res: Response) => {
    try {
        const [productRows] = await connection.query<IProductEntity[]> (
            'SELECT * FROM products WHERE product_id = ?',
            [req.params.id]
        );

        if (!productRows?.[0]) {
            res.status(404);
            res.send(`Product with id ${req.params.id} is not found`);
            return;
        }

        const [similarRows] = await connection.query<ISimilarProductEntity[]> (     // 1-й запрос на получение id похожих товаров
            'SELECT * FROM similar WHERE product_id = ?',
            [req.params.id]
        );

        if (!similarRows?.[0]) {
            res.send([]);
            return;
        }

        const similar = mapSimilarProductsEntity(similarRows);
        const similarProductsIds = similar.map(item => item.similarProductId);

        const [similarProductRows] = await connection.query<IProductEntity[]> (     // 2-й запрос на получение похожих товаров по вышеполученным id
            'SELECT * FROM products WHERE product_id IN ?',
            [[similarProductsIds]]
        );

        const similarProducts = mapProductsEntity(similarProductRows);

        res.send(similarProducts);
    } catch (e) {
        throwServerError(res, e);
    }
});

productsRouter.post('/add-similar-products', async (req: Request<{}, {}, ProductAddSimilar[]>, res: Response) => {  // ЦЕЛИКОМ
    try {
        const similarProducts = req.body;

        if (!similarProducts?.length) {
            res.status(400);
            res.send('Similar products array is empty');
            return;
        }

        const [productRows] = await connection.query<IProductEntity[]> ('SELECT * FROM products');
        const [similarRows] = await connection.query<ISimilarProductEntity[]> ('SELECT * FROM similar');

        const products = mapProductsEntity(productRows);
        const similar = mapSimilarProductsEntity(similarRows);

        const productIdsQuery = similarProducts.map(item => item.productId);
        const similarProductIdsQuery = similarProducts.map(item => item.similarProductId);
        const productIdsInDB = products.map(item => item.id);

        // console.log('Пары значений: ', similarProducts);
        // console.log('Пары значений из БД: ', similarRows);
        // console.log('Айдишники товаров из запроса: ', productIdsQuery);
        // console.log('Айдишники похожих товаров из запроса: ', similarProductIdsQuery);
        // console.log('Айдишники из БД: ', productIdsFromDB);

        const checkProductIdInDB = checkArraysForMatchingValues(productIdsQuery, productIdsInDB);
        const checkSimilarProductIdInDB = checkArraysForMatchingValues(similarProductIdsQuery, productIdsInDB);

        if (!checkProductIdInDB || !checkSimilarProductIdInDB) {                    // Проверка - все ли товары имеются в БД
            res.status(404);
            res.send('Products with the provided ids were not found');
            return;
        }
        
        const similarProductsUniq = similarProducts.filter(similarProduct =>        // Оставляем в массиве только те пары товаров, которых в БД еще нет
            !similar.some(similarRow =>                                             // В случае явного указания фигурных скобок необходимо писать и ключевое слово 'return'
                similarProduct.productId === similarRow.productId &&
                similarProduct.similarProductId === similarRow.similarProductId
            )
        );

        for (let i = 0; i < similarProductsUniq.length; i++) {
            const semilarId = uuidv4();
            await connection.query<OkPacket> (
                INSERT_SIMILAR_PRODUCT_QUERY,
                [[[semilarId, similarProductsUniq[i].productId, similarProductsUniq[i].similarProductId]]]
            );
        }

        res.status(201);
        res.send('Similar products have been added!');
    } catch (e) {
        throwServerError(res, e);
    }
});

productsRouter.post('/remove-similar-products', async (req: Request<{}, {}, ISimilarProductsRemovePayload>, res: Response) => {    // Для удаления выборочных связей товара
    try {
        const similarProductsToRemove = req.body;

        const [productRows] = await connection.query<IProductEntity[]> (
            'SELECT * FROM products WHERE product_id = ?',
            [similarProductsToRemove.productId]
        );

        if (!similarProductsToRemove?.similarProductIds?.length) {
            res.status(400);
            res.send('Similar products array is empty');
            return;
        }

        if (!productRows?.[0]) {
            res.status(404);
            res.send(`Product with id ${similarProductsToRemove.productId} is not found`);
            return;
        }

        const [info] = await connection.query<OkPacket> (
            DELETE_SIMILAR_PRODUCTS_QUERY,
            [similarProductsToRemove.productId, similarProductsToRemove.similarProductIds]
        );

        if (info.affectedRows === 0) {
            res.status(404);
            res.send('No one similar product has been removed');
            return;
        }

        res.status(201);
        res.send('Similar products have been removed!');
    } catch (e) {
        throwServerError(res, e);
    }
});

productsRouter.post('/remove-all-similar-products', async (req: Request<{}, {}, IAllSimilarProductsRemovePayload>, res: Response) => {    // Для удаления всех связей товара
    try {
        const similarProductsToRemove = req.body;

        if (!similarProductsToRemove?.length) {
            res.status(400);
            res.send('Similar products array is empty');
            return;
        }

        const [info] = await connection.query<OkPacket>(DELETE_ALL_SIMILAR_PRODUCTS_QUERY, [[similarProductsToRemove]]);

        if (info.affectedRows === 0) {
            res.status(404);
            res.send('No one similar product has been removed');
            return;
        }

        res.status(201);
        res.send('Similar products have been removed!');
    } catch (e) {
        throwServerError(res, e);
    }
});
//===========================================================================