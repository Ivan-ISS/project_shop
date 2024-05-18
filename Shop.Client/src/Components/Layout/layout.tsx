import styles from './layout.module.scss';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import Content from '../Content/content';

export default function Layout() {

    return (
        <div className={styles.layout}>
            <Header>

            </Header>
            <main className={styles.main}>
                <div className={styles.container}>
                    <Content/>
                </div>
            </main>
            <Footer/>
        </div>
    );
}