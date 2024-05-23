import styles from './commentsList.module.scss';
import { IComment } from '@Shared/types';
import CommentItem from '../CommentItem/commentItem';

export interface CommentsListProps {
    comments: IComment[] | undefined;
}

export default function CommentsList({ comments }: CommentsListProps) {

    return (
        <div className={styles.comments}>
            <h2 className={styles.commentsTitle}>{`Comments (${comments?.length ? comments.length : '0'})`}</h2>
            <ul className={styles.commentsList}>
                {comments?.map((comment, index) => (
                    <li key={index} className={styles.comment}>
                        <CommentItem comment={comment}/>
                    </li>
                ))}
            </ul>
        </div>
    );
}