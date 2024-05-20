import styles from '../../styles/pageStyles/showcase.module.scss';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { selectProducts } from '../../redux/slices/productsSlice/productsSelectors';
import { fetchProducts } from '../../redux/slices/productsSlice/productsSlice';
import ProductsList from '../Products/ProductsList/productsList';

export default function Showcase() {
    const dispatch = useAppDispatch();
    const products = useAppSelector(selectProducts);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <div className={styles.showcase}>
            <h1 className={styles.title}>
                Список товаров
                <span className={styles.textDecor}>{` (${products.length}) `}</span>
            </h1>
            <ProductsList products={products}/>
        </div>
    );
}
