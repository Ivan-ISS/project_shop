import styles from './commentItem.module.scss';
import { IComment } from '@Shared/types';

export interface CommentItemProps {
    comment: IComment;
}

export default function CommentItem({ comment }: CommentItemProps) {

    return (
        <>
            <div className={styles.commentTitle}>
                <span className={styles.commentLabel}>Title: </span>
                {comment.name}
            </div>
            <div className={styles.commentAuthor}>
                <span className={styles.commentLabel}>Author: </span>
                {comment.email}
            </div>
            <div className={styles.commentText}>
                {comment.body}
            </div>
        </>
    );
}