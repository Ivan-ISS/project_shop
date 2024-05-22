import styles from './productItem.module.scss';
import { IProduct } from '@Shared/types';
import { HTMLAttributes } from 'react';
import { useNavigate } from 'react-router-dom';
import formatToPrice from '../../../utils/formatToPrice';

export interface ProductItemProps extends HTMLAttributes<HTMLDivElement>{
    product: IProduct;
}

export default function ProductItem({ product, ...props }: ProductItemProps) {
    const navigate = useNavigate();

    return (
        <div {...props} className={styles.productItem} onClick={() => navigate(`/${product.id}`)}>
            <div className={styles.productImage}>
                <img src={product.thumbnail?.url || 'images/png/product-placeholder.png'} alt={product.title}/>
            </div>
            <div className={styles.productInfo}>
                <div className={styles.productTitle}>
                    {product.title}
                </div>
                <div>
                    <span className={styles.productLabel}>Comments: </span>
                    {product.comments?.length || 0}
                </div>
                <div>
                    <span className={styles.productLabel}>Price: </span>
                    {formatToPrice(product.price)}
                </div>
            </div>
        </div>
    );
}