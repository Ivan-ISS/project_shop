import { IProduct } from '@Shared/types';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import routes from '../../../routes';

export interface fetchProductsError {
    message: string;
}

export const fetchSimilarProducts = createAsyncThunk<IProduct[], string, { rejectValue: fetchProductsError | undefined }>(
    'similarProducts/fetch',
    async (id, thunkAPI) => {
        try {
            const response = await fetch(`${routes.url()}/similar-product/${id}`);
            const data = await response.json();
            console.log('Response data (similar products): ', data);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ message: error } as fetchProductsError);
        }
    }
);

export interface IState {
    similarProducts: IProduct[];
    status: 'not started' | 'in progress' | 'successfully' | 'download faild';
    error: string;
}

const similarProductsSlice = createSlice({
    name: 'similarProducts',
    initialState: {
        similarProducts: [],
        status: 'not started',
        error: '',
    } as IState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSimilarProducts.pending, (state) => {
                state.status = 'in progress';
            })
            .addCase(fetchSimilarProducts.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
                state.status = 'successfully';
                state.similarProducts = action.payload;
            })
            .addCase(fetchSimilarProducts.rejected, (state, action: PayloadAction<fetchProductsError | undefined>) => {
                state.status = 'download faild';
                if (action.payload) {
                    state.error = action.payload.message;
                }
            });
    }
});

export { similarProductsSlice };