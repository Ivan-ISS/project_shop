import { RootState } from '../../store';

export const selectSimilarProducts = (state: RootState) => state.similarProducts.similarProducts;
export const selectSimilarProductsStatus = (state: RootState) => state.products.status;