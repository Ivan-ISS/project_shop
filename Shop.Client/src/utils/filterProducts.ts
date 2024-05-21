import { IProduct } from '@Shared/types';
import { IFilters } from '../types';

export default function filterProducts(products: IProduct[], filters: IFilters) {
    const priceFrom = filters.priceFrom === null ? 0 : filters.priceFrom;
    const priceTo = filters.priceTo === null ? 99999999 : filters.priceTo;

    const flteredProducts = products.filter(product => 
        (product.title.includes(filters.productName)) &&
        (product.price >= priceFrom) &&
        (product.price <= priceTo)
    );
    return flteredProducts;
}