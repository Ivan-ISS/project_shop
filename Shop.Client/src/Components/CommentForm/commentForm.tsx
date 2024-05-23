import styles from './commentForm.module.scss';
import { commentFormFields } from '../../data';
import { useState, FormEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { selectCommentError } from '../../redux/slices/commentSlice/commentSelector';
import { fetchCommentSend } from '../../redux/slices/commentSlice/commentSlice';
import { fetchProducts } from '../../redux/slices/productsSlice/productsSlice';
import Input from '../Common/Input/Input';
import Textarea from '../Common/Textarea/textarea';
import Button from '../Common/Button/button';

export interface CommentForm {
    productId: string;
}

export default function CommentForm({ productId }: CommentForm) {
    const [ formData, setFormData ] = useState({ productId: productId, name: '', email: '', body: '' });
    const commentError = useAppSelector(selectCommentError);
    const dispatch = useAppDispatch();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await dispatch(fetchCommentSend({ ...formData }));  // дожидаемся окончания записи комментария в БД, чтобы при новом рендере комментарий был уже на клиенте
        setFormData({ productId: productId, name: '', email: '', body: '' });
        await dispatch(fetchProducts());
    };

    const handleChange = (field: string, event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: event.target.value
        }));
    };

    return (
        <form className={styles.commentFrom} onSubmit={handleSubmit}>
            <h2 className={styles.commentFormTitle}>
                Submit a comment
            </h2>
            <div className={styles.formFields}>
                {commentFormFields.map((commentFormField, index) => 
                    <Input
                        key={index}
                        name={commentFormField.name}
                        type={commentFormField.type}
                        value={formData[commentFormField.varName as keyof typeof formData]}
                        onChange={(event) => handleChange(commentFormField.varName, event)}
                        required
                    />
                )}
            </div>
            <Textarea
                name={'Comment'}
                value={formData.body}
                onChange={(event) => handleChange('body', event)}
                required
            />
            { commentError ? <div className={styles.errorPanel} >{commentError}</div> : null }
            <div className={styles.buttonPanel}>
                <Button text={'Send'} fontSize={'big'} color={'black'} type="submit"/>
            </div>
        </form>
    );
}
