import axios from 'axios';
import { IProduct, IProductFilterPayload } from '@Shared/types';
import { IProductEditData } from '../types';
import { API_HOST } from './const';

export async function getProducts() {
    const { data } = await axios.get<IProduct[]> (`${API_HOST}/products`);
    return data || [];
}

export async function searchProducts(filter: IProductFilterPayload): Promise<IProduct[]> {
    const { data } = await axios.get<IProduct[]> (`${API_HOST}/products/search`, { params: filter });
    return data || [];
}

export async function getProduct(id: string): Promise<IProduct | null> {
    try {
        const { data } = await axios.get<IProduct> (`${API_HOST}/products/${id}`);
        return data;
    } catch (e) {
        return null;
    }
}

export async function removeProduct(id: string): Promise<void> {
    await axios.delete(`${API_HOST}/products/${id}`);
}


function compileIdsToRemove(data: string | string[]): string[] {
    if (typeof data === "string") return [data];
    return data;
}

function splitNewImages(data = ''): string[] {
    return data.trim().split(/\r\n|,/g);
    // return data.split(/\r\n|,/g).map(url => url.trim()).filter(url => url);
}

export async function updateProduct(productId: string, formData: IProductEditData): Promise<IProduct | null> {
    try {
        const {
            data: currentProduct
        } = await axios.get<IProduct> (`${API_HOST}/products/${productId}`);

        if (formData.commentsToRemove) {
            const commentsIdsToRemove = compileIdsToRemove(formData.commentsToRemove);
            // const getDeleteCommentActions = () => commentsIdsToRemove.map(commentId => {
            //     return axios.delete(`${API_HOST}/comments/${commentId}`);
            // });
            // await Promise.all(getDeleteCommentActions());

            for (let i = 0; i < commentsIdsToRemove.length; i++) {
                await axios.delete(`${API_HOST}/comments/${commentsIdsToRemove[i]}`);
            }
        }

        if (formData.imagesToRemove) {
            const imagesIdsToRemove = compileIdsToRemove(formData.imagesToRemove);
            await axios.post(`${API_HOST}/products/remove-images`, imagesIdsToRemove);
        }

        if (formData.newImages) {
            const urls = splitNewImages(formData.newImages);
            const images = urls.map(url => ({ main: false, url }))

            if (!currentProduct.thumbnail) {
                images[0].main = true;
            }

            await axios.post(`${API_HOST}/products/add-images`, { productId, images });
        }

        if (formData.mainImage && formData.mainImage !== currentProduct?.thumbnail?.id) {
            await axios.post(`${API_HOST}/products/update-thumbnail/${productId}`, { newThumbnailId: `${formData.mainImage}` });
        }

        await axios.patch(`${API_HOST}/products/${productId}`, {
            title: formData.title,
            description: formData.description,
            price: Number(formData.price)
          });

        return currentProduct;
    } catch (e) {
        console.log(e); // фиксируем ошибки, которые могли возникнуть в процессе
    }
}

//===========================================================================
//====================== ИТОГОВОЕ ПРАКТИЧЕСКОЕ ЗАДАНИЕ ======================

export async function getSimilarProducts(id: string): Promise<IProduct[] | null> {
    try {
        const { data } = await axios.get<IProduct[]> (`${API_HOST}/products/similar-product/${id}`);
        return data || null;
    } catch (e) {
        return null;
    }
}

export async function getOtherProducts(id: string): Promise<IProduct[] | null> {
    try {
        const allProducts = await getProducts();
        const similarProducts = await getSimilarProducts(id);

        const otherProducts = allProducts.filter(product =>
            similarProducts.some(similarProduct => product.id !== similarProduct.id) &&
            (product.id !== id)
        );

        return otherProducts || null;
    } catch (e) {
        return null;
    }
}