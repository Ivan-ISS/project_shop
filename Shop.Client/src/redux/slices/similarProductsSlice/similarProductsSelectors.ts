import { RootState } from '../../store';

export const selectSimilarProducts = (state: RootState) => state.similarProducts.similarProducts;