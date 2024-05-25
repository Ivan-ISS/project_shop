import styles from '../../styles/pageStyles/home.module.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/store';
import { selectProducts, selectProductsStatus } from '../../redux/slices/productsSlice/productsSelectors';
import Button from '../Common/Button/button';
import Loader from '../Common/Loader/loader';
import routes from '../../routes';
import formatToPrice from '../../utils/formatToPrice';

export default function Home() {
    const [ totalPrice, setTotalPrice ] = useState<number>(0);
    const products = useAppSelector(selectProducts);
    const productsStatus = useAppSelector(selectProductsStatus);
    const navigate = useNavigate();

    useEffect(() => {
        let summ = 0;
        products.forEach(product => summ += product.price);
        setTotalPrice(summ);
    }, [products]);

    const handleClickToProducts = () => {
        navigate(routes.productsList());
    };

    const handleClickToAdminSystem = () => {
        //navigate('admin/auth/login');
        window.open('http://localhost:3000/admin/auth/login', '_blank');
    };

    if (productsStatus === 'in progress') {
        return (
            <div className={styles.loaderPanel}><Loader/></div>
        );
    }

    return (
        <div>
            <h1 className={styles.title}>Shop.Client</h1>
            <p className={styles.info}>
                Общее количество товаров в базе
                <span className={styles.textDecor}>{` ${products.length} `}</span>
                общей стоимостью
                <span className={styles.textDecor}>{` ${formatToPrice(totalPrice)} `}</span>
            </p>
            <div className={styles.buttonPanel}>
                <Button text={'Перейти к списку товаров'} fontSize={'big'} color={'black'} onClick={handleClickToProducts}/>
                <Button text={'Перейти в систему администрирования'} fontSize={'big'} color={'black'} onClick={handleClickToAdminSystem}/>
            </div>
        </div>
    );
}