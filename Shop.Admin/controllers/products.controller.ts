import { Router, Request, Response } from 'express';
import { getProducts, searchProducts, getProduct, removeProduct, updateProduct } from '../models/products.model';
import { throwServerError } from './helper';
import { IProductFilterPayload } from '@Shared/types';
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

        if (product) {
            res.render('product/product', {item: product});
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
    const updatedProduct = await updateProduct(req.params.id, req.body);
    //if (updatedProduct) {
        res.redirect(`/${process.env.ADMIN_PATH}/${req.params.id}`);
    //    res.render('product/product', {item: updatedProduct});
    //}
    // console.log(req.body);
    // res.send("OK");
});