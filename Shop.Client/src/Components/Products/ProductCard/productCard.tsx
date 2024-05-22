import styles from './productCard.module.scss';
import { IProduct } from '@Shared/types';
import { useNavigate } from 'react-router-dom';
import formatToPrice from '../../../utils/formatToPrice';

export interface ProductCardProps {
    product: IProduct;
    similarProducts: IProduct[];
}

export default function ProductCard({ product, similarProducts }: ProductCardProps) {
    const navigate = useNavigate();

    return (
        <div className={styles.productCard}>
            <div className={styles.blockImages}>
                <div className={styles.productThumbnail}>
                    <img src={product.thumbnail?.url || 'images/png/product-placeholder.png'} alt={product.title} />
                </div>
                <div className={styles.productImages}>
                    {product.images?.map((image, index) => (
                        <div key={index} className={styles.productImage}>
                            <img src={image.url} alt={product.title} />
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.productInfo}>
                <div className={styles.productDescription}>
                    <span className={styles.productLabel}>Description: </span>
                    {product.description}
                </div>
                <div className={styles.productPrice}>
                    <span className={styles.productLabel}>Price: </span>
                    {formatToPrice(product.price)}
                </div>
                <div className={styles.similarProducts}>
                    <h3 className={styles.similarTitle}>
                        {`Similar products (${similarProducts.length})`}
                    </h3>
                    <div className={styles.similarProductsList}>
                        {similarProducts.map((similarProduct, index) => (
                            <div key={index} className={styles.similarProductsInfo} onClick={() => navigate(`/${similarProduct.id}`)}>
                                <div className={styles.similarProductTitle}>{similarProduct.title}</div>
                                <div>{formatToPrice(similarProduct.price)}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}