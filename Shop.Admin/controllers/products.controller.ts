import { Router, Request, Response } from 'express';
import { getProducts, getSimilarProducts, getOtherProducts, searchProducts, getProduct, removeProduct, updateProduct, createProduct } from '../models/products.model';
import { throwServerError } from './helper';
import { ProductCreatePayload, IProductFilterPayload } from '@Shared/types';
import { IProductEditData } from '../types';

export const productsRouter = Router();

productsRouter.get('/', async (req: Request, res: Response) => {    // Получается, что мы здесь создаем также API через методы, но внутри здесь разворачивается наш API сделанный
    try {                                                           // в API-приложении, т.к. мы через запрос axios обращаемся к нему
        console.log(req.session.username);
        console.log(req.session);
        const products = await getProducts();
        res.render('products', {
            items: products,
            queryParams: {}
        });
    } catch (e) {
        throwServerError(res, e);
    }
});

//====================== ИТОГОВОЕ ПРАКТИЧЕСКОЕ ЗАДАНИЕ ======================
productsRouter.get('/new-product', async (req: Request, res: Response) => {
    try {
        res.render('product-new');
    } catch (e) {
        throwServerError(res, e);
    }
});
//===========================================================================

productsRouter.get('/search', async (req: Request<{}, {}, {}, IProductFilterPayload>, res: Response) => {
    try {
        const products = await searchProducts(req.query);
        res.render('products', {
            items: products,
            queryParams: req.query
        });
    } catch (e) {
        throwServerError(res, e);
    }
});

productsRouter.get('/:id', async (req: Request<{ id: string }>, res: Response) => {
    try {
        const product = await getProduct(req.params.id);
        const similarProducts = await getSimilarProducts(req.params.id);
        const otherProducts = await getOtherProducts(req.params.id);

        if (product) {
            res.render('product/product', {
                item: product,
                similarItems: similarProducts,
                otherItems: otherProducts
            });
        } else {
            res.render('product/empty-product', {id: req.params.id});
        }
    } catch (e) {
        throwServerError(res, e);
    }
});

productsRouter.get('/remove-product/:id', async (req: Request<{ id: string }>, res: Response) => {
    try {
        if (req.session.username !== "admin") {
            res.status(403);
            res.send('Forbidden');
            return;
        }

        await removeProduct(req.params.id);
        res.redirect(`/${process.env.ADMIN_PATH}`);
    } catch (e) {
        throwServerError(res, e);
    }
});

productsRouter.post('/save/:id', async (req: Request<{ id: string }, {}, IProductEditData>, res: Response) => {
    try {
        await updateProduct(req.params.id, req.body);
        res.redirect(`/${process.env.ADMIN_PATH}/${req.params.id}`);
        // console.log(req.body);
    } catch (e) {
        throwServerError(res, e);
    }
});

//====================== ИТОГОВОЕ ПРАКТИЧЕСКОЕ ЗАДАНИЕ ======================
productsRouter.post('/create-product', async (req: Request<{}, {}, ProductCreatePayload>, res: Response) => {
    try {
        const createdProduct = await createProduct(req.body);
        res.redirect(`/${process.env.ADMIN_PATH}/${createdProduct.id}`);
    } catch (e) {
        throwServerError(res, e);
    }
});
//===========================================================================