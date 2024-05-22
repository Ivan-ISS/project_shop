import styles from '../../styles/pageStyles/product.module.scss';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { fetchSimilarProducts } from '../../redux/slices/similarProductsSlice/similarProductsSlice';
import { selectProducts } from '../../redux/slices/productsSlice/productsSelectors';
import { selectSimilarProducts } from '../../redux/slices/similarProductsSlice/similarProductsSelectors';
import ProductCard from '../Products/ProductCard/productCard';

export default function Product() {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const products = useAppSelector(selectProducts);
    const similarProducts = useAppSelector(selectSimilarProducts);
    const product = products.find(product => product.id === id);

    useEffect(() => {
        if (id) {
            dispatch(fetchSimilarProducts(id));
        }
    }, [dispatch, id]);

    if (!product) {
        return (
            <div>{`Product with id ${id} is not found`}</div>
        );
    }

    return (
        <div className={styles.product}>
            <h1 className={styles.productTitle}>{product.title}</h1>
            <ProductCard product={product} similarProducts={similarProducts}/>
        </div>
    );
}