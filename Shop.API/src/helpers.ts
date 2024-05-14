import { Response } from 'express';
import { IComment, IProduct, IImage } from "@Shared/types";
import { ICommentEntity, IImageEntity, CommentCreatePayload, IProductSearchFilter } from '../types';
import { readFile, writeFile } from 'fs/promises';
import { mapCommentEntity, mapImageEntity } from './services/mapping';

//=============================================================================
//=====================ЗАГРУЗКА И СОХРАНЕНИЕ КОММЕНТАРИЕВ======================
export const loadComments = async (): Promise<IComment[]> => {
    const rawData = await readFile('mock-comments-new.json', 'binary');
    return JSON.parse(rawData.toString());
}

export const saveComments = async (data: IComment[]): Promise<boolean> => {
    try {
        await writeFile('mock-comments-new.json', JSON.stringify(data));
    } catch(e) {
        return false;
    }
}




//=============================================================================
//====================ПРОВЕРКА КОММЕНТАРИЯ НА УНИКАЛЬНОСТЬ=====================
const compareValues = (target: string, compare: string): boolean => {
    return target.toLowerCase() === compare.toLowerCase();
}

export const checkCommentUniq = (payload: CommentCreatePayload, comments: IComment[]): boolean => {
    const byEmail = comments.find(({ email }) => compareValues(payload.email, email));

    if (!byEmail) {
        return true;
    }

    const { body, name, productId } = byEmail;
    return !(
        compareValues(payload.body, body) &&
        compareValues(payload.name, name) &&
        compareValues(payload.productId.toString(), productId.toString())
    );
}

//=============================================================================
//====================ПРОВЕРКА КОММЕНТАРИЯ НА ВАЛИДНОСТЬ=======================

export const validateComment = (comment: CommentCreatePayload): string | null => {
    if (!comment || Object.keys(comment).length === 0) {
        return 'Comment is absent or empty';
    }

    const requiredFields = new Set<keyof CommentCreatePayload>([ 'name', 'email', 'body', 'productId' ]);

    let wrongFieldName;

    requiredFields.forEach((field) => {
        if (!comment.hasOwnProperty(field) || comment[field] === '') {
            wrongFieldName = field;
            return;
        }
    });

    if (wrongFieldName) {
        return `Field ${wrongFieldName} is absent`;
    }

    return null;
}

//=============================================================================
//===================ХЕЛПЕР ДЛЯ ОТПРАВКИ ОТВЕТА с КОДОМ 500====================
export const throwServerError = (res: Response, e: Error) => {
    console.debug(e.message);
    res.status(500);
    res.send('Something went wrong');
}

//=============================================================================
//======================НАПОЛНЕНИЕ ТОВАРОВ КОММЕНТАРИЯМИ=======================
export const enhanceProductsComments = (products: IProduct[], commentRows: ICommentEntity[]): IProduct[] => {
    const commentsByProductId = new Map<string, IComment[]>();

    for (let commentEntity of commentRows) {
        const comment = mapCommentEntity(commentEntity);
        if (!commentsByProductId.has(comment.productId)) {
            commentsByProductId.set(comment.productId, []);
        }

        const list = commentsByProductId.get(comment.productId);
        commentsByProductId.set(comment.productId, [...list, comment]);
    }

    for (let product of products) {
        if (commentsByProductId.has(product.id)) {
            product.comments = commentsByProductId.get(product.id);
        }
    }

    return products;
}

//=============================================================================
//======================НАПОЛНЕНИЕ ТОВАРОВ ИЗОБРАЖЕНИЯМИ=======================
export const enhanceProductsImages = (products: IProduct[], imageRows: IImageEntity[]): IProduct[] => { // ЦЕЛИКОМ
    const imagesByProductId = new Map<string, IImage[]>();
    const thumbnailByProductId = new Map<string, IImage>();

    for (let imageEntity of imageRows) {
        const image = mapImageEntity(imageEntity);
        if (!imagesByProductId.has(image.productId)) {
            imagesByProductId.set(image.productId, []);
        }
        if (!thumbnailByProductId.has(image.productId) && image.main === true) {
            thumbnailByProductId.set(image.productId, image);
        }

        const list = imagesByProductId.get(image.productId);
        imagesByProductId.set(image.productId, [...list, image]);
    }

    for (let product of products) {
        product.thumbnail = thumbnailByProductId.get(product.id);

        if (imagesByProductId.has(product.id)) {
            product.images = imagesByProductId.get(product.id);

            if (!product.thumbnail) {
                product.thumbnail = product.images[0];
            }
        }
    }

    return products;
}

//=============================================================================
//======================ФОРМИРОВАНИЕ ЗАПРОСА ПО ФИЛЬТРАМ=======================
export const getProductsFilterQuery = (filter: IProductSearchFilter): [string, string[]] => {
    const { title, description, priceFrom, priceTo } = filter;

    let query = 'SELECT * FROM products WHERE ';
    const values = []

    if (title) {
        query += 'title LIKE ? ';
        values.push(`%${title}%`);
    }

    if (description) {
        if (values.length) {
            query += ' OR ';
        }

        query += 'description LIKE ? ';
        values.push(`%${description}%`);
    }

    if (priceFrom || priceTo) {
        if (values.length) {
            query += ' OR ';
        }

        query += `(price > ? AND price < ?)`;
        values.push(priceFrom || 0);
        values.push(priceTo || 999999);
    }

    return [query, values];
}

//=============================================================================
//====================ПРОВЕРКА СОВПАДЕНИЙ ЗНАЧЕНИЙ МАССИВОВ====================
export const checkArraysForMatchingValues = (arrFirst: string[], arrSecond: string[]): boolean => {
    let checking = true;
    arrFirst.forEach(elementFirst => {
        if (!arrSecond.find(elementSecond => elementSecond === elementFirst)) {
            checking = false;
        }
    });
    return checking;
}