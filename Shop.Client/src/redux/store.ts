import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { productsSlice } from './slices/productsSlice/productsSlice';
import { filtersSlice } from './slices/filtersSlice/filtersSlice';

const store = configureStore({
    reducer: {
        products: productsSlice.reducer,
        filters: filtersSlice.reducer,
    }
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<RootDispatch>();