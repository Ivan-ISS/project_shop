import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import routes from '../../../routes';

export interface fetchCommentError {
    message: string;
}

export interface fetchCommentSendArgs {
    productId: string;
    name: string;
    email: string;
    body: string;
}

export const fetchCommentSend = createAsyncThunk<void, fetchCommentSendArgs, {rejectValue: fetchCommentError | undefined}>(
    'commentSend/fetch',
    async (formData, thunkAPI) => {
        try {
            const response =await fetch(routes.urlComment(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const error = await response.text();
                return thunkAPI.rejectWithValue({message: error} as fetchCommentError);
            }
        } catch (error) {
            return thunkAPI.rejectWithValue({message: error} as fetchCommentError);
        }
    }
);

export interface IState {
    status: 'not started' | 'in progress' | 'successfully' | 'download failed';
    error: string;
}

const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        status: 'not started',
        error: '',
    } as IState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommentSend.pending, (state) => {
                state.status = 'in progress';
            })
            .addCase(fetchCommentSend.fulfilled, (state) => {
                state.status = 'successfully';
            })
            .addCase(fetchCommentSend.rejected, (state, action: PayloadAction<fetchCommentError | undefined>) => {
                state.status = 'download failed';
                if (action.payload) {
                    state.error = action.payload.message;
                    console.log('error ', state.error);
                }
            });
    }
});

export { commentSlice };