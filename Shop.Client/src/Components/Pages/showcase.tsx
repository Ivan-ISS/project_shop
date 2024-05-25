import styles from '../../styles/pageStyles/showcase.module.scss';
import { useAppSelector } from '../../redux/store';
import { selectProducts, selectProductsStatus, selectProductsError } from '../../redux/slices/productsSlice/productsSelectors';
import ProductsList from '../Products/ProductsList/productsList';
import SearchForm from '../SeacrForm/searchFrom';
import Loader from '../Common/Loader/loader';

export default function Showcase() {
    const products = useAppSelector(selectProducts);
    const productError = useAppSelector(selectProductsError);
    const productsStatus = useAppSelector(selectProductsStatus);

    if (productsStatus === 'in progress') {
        return (
            <div className={styles.loaderPanel}><Loader/></div>
        );
    }

    if (productError !== '') {
        return (
            <div className={styles.errorPanel}>{productError}</div>
        );
    }

    return (
        <div className={styles.showcase}>
            <h1 className={styles.title}>
                {`List of products (${products.length})`}
            </h1>
            <SearchForm/>
            <ProductsList products={products}/>
        </div>
    );
}
