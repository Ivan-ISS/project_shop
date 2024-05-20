import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '@Shared/types';

interface FetchProductsError {
    message: string; 
}

export const fetchProducts = createAsyncThunk<IProduct[], void, { rejectValue: FetchProductsError | undefined }>(
    'products/fetch',
    async (_, thunkAPI) => {
        try {
            const response = await fetch('http://localhost:8000/api/products');
            const data = await response.json();
            console.log('here ', data);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ message: error } as FetchProductsError);
        }
    }
);

export interface IState {
    products: IProduct[];
    status: 'not started' | 'in progress' | 'successfully' | 'download faild';
    error: string;
}

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        status: 'not started',
        error: '',
    } as IState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.
            addCase(fetchProducts.pending, (state) => {
                state.status = 'in progress';
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
                state.status = 'successfully';
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action: PayloadAction<FetchProductsError | undefined>) => {
                state.status = 'download faild';
                if (action.payload) {
                    state.error = action.payload.message;
                }
            });
    }
});

export { productsSlice }; // можно и сразу только редьюсер экспортировать export { productsSlice.reducer };