import { RootState } from '../../store';

export const selectCommentError = (state: RootState) => state.comment.error;
export const selectCommentStatus = (state: RootState) => state.comment.status;