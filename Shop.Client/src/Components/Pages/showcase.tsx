import styles from '../../styles/pageStyles/showcase.module.scss';
import { useAppSelector } from '../../redux/store';
import { selectProducts } from '../../redux/slices/productsSlice/productsSelectors';
import ProductsList from '../Products/ProductsList/productsList';
import SearchForm from '../SeacrForm/searchFrom';

export default function Showcase() {
    const products = useAppSelector(selectProducts);

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
