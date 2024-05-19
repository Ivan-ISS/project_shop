import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
    'products/fetch',
    async (_, thunkAPI) => {
        try {
            const response = await fetch('http://localhost:8000/api/products');
            const data = await response.json();
            console.log('here ', data);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        status: '',
        error: '',
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.
            addCase(fetchProducts.pending, (state) => {
                state.status = 'in progress';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'successfully';
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state/* , action */) => {
                state.status = 'download faild';
                //state.error = action.payload.message;
            });
    }
});

export { productsSlice }; // можно и сразу только редьюсер экспортировать export { productsSlice.reducer };