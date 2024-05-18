import styles from './layout.module.scss';
import { PropsWithChildren } from 'react';
import Header from '../Header/header';
import Footer from '../Footer/footer';

export default function Layout({ children }: PropsWithChildren) {

    return (
        <div className={styles.layout}>
            <Header>

            </Header>
            <main className={styles.main}>
                <div className={styles.container}>{children}</div>
            </main>
            <Footer/>
        </div>
    );
}