import styles from './button.module.scss';
import { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    text?: string;
    fontSize: 'big' | 'small';
    color: 'red' | 'black';
    children?: JSX.Element;
}

export default function Button({ text, fontSize, color, children, ...props }: ButtonProps) {

    const handleClickBtn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (props.onClick) {
            props.onClick(e);
        }
    };

    return (
        <button
            {...props}
            onClick={handleClickBtn}
            className={`${styles.button} ${styles[color]} ${styles[fontSize]}`}
        >
            { text ? text : children }
        </button>
    );
}