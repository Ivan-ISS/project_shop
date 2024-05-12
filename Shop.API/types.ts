import { RowDataPacket } from 'mysql2/index';
import { IComment, IProduct, IImage, IProductFilterPayload, IAuthRequisites } from "@Shared/types";

//============================Комментарии============================
export interface ICommentEntity extends RowDataPacket {
    comment_id: string;
    name: string;
    email: string;
    body: string;
    product_id: string;
}

export type CommentCreatePayload = Omit<IComment, 'id'>;

//============================Изображения=============================
export interface IImageEntity extends RowDataPacket {               // ЦЕЛИКОМ
    image_id: string;
    product_id: string;
    main: number;
    url: string;
}

export type ImageCreatePayload = Omit<IImage, 'id' | 'productId'>;  // ЦЕЛИКОМ

export interface ProductAddImagesPayload {                          // ЦЕЛИКОМ
    productId: string;
    images: ImageCreatePayload[];
}

export type ImagesRemovePayload = string[];

//=============================Продукты===============================
export interface IProductEntity extends IProduct, RowDataPacket {
    product_id: string;
}

export type ProductCreatePayload = Omit<IProduct, 'id' | 'comments' | 'thumbnail'>;

//===========================Для фильтров=============================
export interface IProductSearchFilter extends IProductFilterPayload {
    title?: string;
    description?: string;
    priceFrom?: number;
    priceTo?: number;
}

//=========================Для авторизации=============================
export interface IUserRequisitesEntity extends IAuthRequisites, RowDataPacket {
    id: number;
}