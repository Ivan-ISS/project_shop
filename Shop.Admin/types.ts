declare module 'express-session' {  // ДОПОЛНИТЕЛЬНО ПРИШЛОСЬ СДЕЛАТЬ
    interface SessionData {
      username?: string;
    }
}

export interface IProductEditData {
    title: string;
    description: string;
    price: string;
    mainImage: string;
    newImages?: string;
    commentsToRemove: string | string[];
    imagesToRemove: string | string[];
    similarProductToRemove: string | string[];
    productAddToSimilar: string | string[];
}