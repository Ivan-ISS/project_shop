import styles from './textarea.module.scss';
import { TextareaHTMLAttributes } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
    name: string;
}

export default function Textarea({ name, ...props }: TextareaProps) {

    return (
        <div className={styles.field}>
            <label htmlFor={name} className={styles.label}>{name}</label><br/>
            <textarea
                {...props}
                id={name}
                className={styles.textarea}
                placeholder={`Enter ${name}`}
            />
        </div>
    );
}