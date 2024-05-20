import styles from './layout.module.scss';
import { Link } from 'react-router-dom';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import Content from '../Content/content';

export default function Layout() {

    return (
        <div className={styles.layout}>
            <Header>
                <Link to={'/'}>
                    <div className={styles.wrapLogo}>
                        <img className={styles.logo} src="images/png/logo.png" alt="logo"/>
                        <p className={styles.textLogo}>Phoneshop</p>
                    </div>
                </Link>
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