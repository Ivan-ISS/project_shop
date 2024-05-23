import { IComment, IProduct, IImage, ISimilarProducts } from "@Shared/types";
import { ICommentEntity, IImageEntity, IProductEntity, ISimilarProductEntity } from '../../types';

export const mapCommentEntity = ({ comment_id, product_id, ...rest }: ICommentEntity): IComment => {
    return {
        id: comment_id,
        productId: product_id,
        ...rest
    };
}

export const mapCommentsEntity = (data: ICommentEntity[]): IComment[] => {
    return data.map(mapCommentEntity);
}

export const mapImageEntity = ({ image_id, product_id, main, ...rest }: IImageEntity): IImage => {
    return {
        id: image_id,
        productId: product_id,
        main: main ? true : false,
        ...rest
    };
}

export const mapImagesEntity = (data: IImageEntity[]): IImage[] => {        // ЦЕЛИКОМ
    return data.map(mapImageEntity);
}

export const mapProductsEntity = (data: IProductEntity[]): IProduct[] => {  // ЦЕЛИКОМ
    return data.map(({ product_id, title, description, price }) => ({
        id: product_id,
        title: title || '',
        description: description || '',
        price: Number(price) || 0
    }));
}

export const mapSimilarProductEntity = ({ id, first_product, second_product, ...rest }: ISimilarProductEntity): ISimilarProducts => {
    return {
        id: id,
        productId: first_product,
        similarProductId: second_product,
        ...rest
    };
}

export const mapSimilarProductsEntity = (data: ISimilarProductEntity[]): ISimilarProducts[] => {
    return data.map(mapSimilarProductEntity);
}