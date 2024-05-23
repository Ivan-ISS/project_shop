import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { productsSlice } from './slices/productsSlice/productsSlice';
import { filtersSlice } from './slices/filtersSlice/filtersSlice';
import { similarProductsSlice } from './slices/similarProductsSlice/similarProductsSlice';
import { commentSlice } from './slices/commentSlice/commentSlice';

const store = configureStore({
    reducer: {
        products: productsSlice.reducer,
        filters: filtersSlice.reducer,
        similarProducts: similarProductsSlice.reducer,
        comment: commentSlice.reducer,
    }
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<RootDispatch>();