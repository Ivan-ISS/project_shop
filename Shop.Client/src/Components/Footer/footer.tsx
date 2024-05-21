import styles from './footer.module.scss';

export default function Footer() {

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <p className={styles.footerText}>
                    &#169; 2024 Created by Ivan-ISS
                </p>
            </div>
        </footer>
    );
}