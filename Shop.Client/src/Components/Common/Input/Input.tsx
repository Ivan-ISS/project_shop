import styles from './input.module.scss';
import { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    name: string;
    type: string;
}

export default function Input({ name, type, ...props }: InputProps) {

    return (
        <div className={styles.field}>
            <label htmlFor={name} className={styles.label}>{name}</label><br/>
            <input
                {...props}
                id={name}
                type={type}
                className={styles.input}
                placeholder={`Enter ${type}`}
            />
        </div>
    );
}