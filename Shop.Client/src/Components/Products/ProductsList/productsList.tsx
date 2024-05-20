import styles from './productsList.module.scss';
import { IProduct } from '@Shared/types';
import { HTMLAttributes } from 'react';
import ProductItem from '../ProductItem/productItem';

export interface ProductsListProps extends HTMLAttributes<HTMLDivElement>{
    products: IProduct[];
}

export default function ProductsList({ products, ...props }: ProductsListProps) {

    return (
        <div {...props} className={styles.productsList}>
            {products.map((product, index) => (
                <ProductItem key={index} product={product}/>
            ))}
        </div>
    );
}