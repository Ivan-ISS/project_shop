import styles from './header.module.scss';
import { PropsWithChildren } from 'react';

export default function Header({ children }: PropsWithChildren) {

    return (
        <div className={styles.header}>
            <div className={styles.container}>
                {children}
            </div>
        </div>
    );
}