import styles from '../../styles/pageStyles/product.module.scss';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { fetchSimilarProducts } from '../../redux/slices/similarProductsSlice/similarProductsSlice';
import { selectProducts, selectProductsStatus } from '../../redux/slices/productsSlice/productsSelectors';
import { selectSimilarProducts, selectSimilarProductsStatus } from '../../redux/slices/similarProductsSlice/similarProductsSelectors';
import ProductCard from '../Products/ProductCard/productCard';
import CommentForm from '../CommentForm/commentForm';
import CommentsList from '../Comments/CommentsList/commentsList';
import Loader from '../Common/Loader/loader';

export default function Product() {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const products = useAppSelector(selectProducts);
    const productsStatus = useAppSelector(selectProductsStatus);
    const similarProducts = useAppSelector(selectSimilarProducts);
    const similarProductsStatus = useAppSelector(selectSimilarProductsStatus);
    const product = products.find(product => product.id === id);

    useEffect(() => {
        if (id) {
            dispatch(fetchSimilarProducts(id));
        }
    }, [dispatch, id]);

    if (productsStatus === 'in progress' || similarProductsStatus === 'in progress') {
        return (
            <div className={styles.loaderPanel}><Loader/></div>
        );
    }

    if (!product) {
        return (
            <div>{`Product with id ${id} is not found`}</div>
        );
    }

    return (
        <div className={styles.product}>
            <h1 className={styles.productTitle}>{product.title}</h1>
            <ProductCard product={product} similarProducts={similarProducts}/>
            <CommentForm productId={product.id}/>
            <CommentsList comments={product.comments}/>
        </div>
    );
}