import styles from './commentForm.module.scss';
import { commentFormFields } from '../../data';
import { useState, FormEvent } from 'react';
//import { useAppDispatch } from '../../redux/store';
//import { applyFilters } from '../../redux/slices/filtersSlice/filtersSlice';
import Input from '../Common/Input/Input';
import Textarea from '../Common/Textarea/textarea';
import Button from '../Common/Button/button';

export default function SearchForm() {
    const [ valueInput, setValueInput ] = useState({ title: '', email: '', body: '' });
    const [ formData, setFormData ] = useState({ title: '', email: '', body: '' });
    //const dispatch = useAppDispatch();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formData);
        //dispatch(applyFilters(formData));
        setValueInput({ title: '', email: '', body: '' });
    };

    const handleChange = (field: string, event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: event.target.value
        }));
        setValueInput(formData);
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
                        value={valueInput[commentFormField.varName as keyof typeof valueInput]}
                        onChange={(event) => handleChange(commentFormField.varName, event)}
                        required
                    />
                )}
            </div>
            <Textarea
                name={'Comment'}
                value={valueInput.body}
                onChange={(event) => handleChange('body', event)}
                required
            />
            <div className={styles.buttonPanel}>
                <Button text={'Send'} fontSize={'big'} color={'black'} type="submit"/>
            </div>
        </form>
    );
}
