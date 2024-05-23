import { RootState } from '../../store';

export const selectCommentError = (state: RootState) => state.comment.error;