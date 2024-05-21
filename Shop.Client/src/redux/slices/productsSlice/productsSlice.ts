import { IProduct } from '@Shared/types';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { applyFilters, resetFilters } from '../filtersSlice/filtersSlice';
import routes from '../../../routes';
import filterProducts from '../../../utils/filterProducts';

interface FetchProductsError {
    message: string; 
}

export const fetchProducts = createAsyncThunk<IProduct[], void, { rejectValue: FetchProductsError | undefined }>(
    'products/fetch',
    async (_, thunkAPI) => {
        try {
            const response = await fetch(routes.url());
            const data = await response.json();
            console.log('Response data: ', data);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ message: error } as FetchProductsError);
        }
    }
);

export interface IState {
    initialProducts: IProduct[];
    products: IProduct[];
    status: 'not started' | 'in progress' | 'successfully' | 'download faild';
    error: string;
}

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        initialProducts: [],
        products: [],
        status: 'not started',
        error: '',
    } as IState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'in progress';
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
                state.status = 'successfully';
                state.initialProducts = action.payload;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action: PayloadAction<FetchProductsError | undefined>) => {
                state.status = 'download faild';
                if (action.payload) {
                    state.error = action.payload.message;
                }
            })
            .addCase(applyFilters, (state, action) => {
                state.products = state.initialProducts;
                const filteredProducts = filterProducts(state.products, action.payload);
                state.products = filteredProducts;
                console.log('Отслеживаем: ', action.payload);
            })
            .addCase(resetFilters, (state) => {
                state.products = state.initialProducts;
            });
    }
});

export { productsSlice }; // можно и сразу только редьюсер экспортировать export { productsSlice.reducer };