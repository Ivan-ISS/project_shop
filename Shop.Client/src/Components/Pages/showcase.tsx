import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { selectProducts } from '../../redux/slices/productsSlice/productsSelectors';
import { fetchProducts } from '../../redux/slices/productsSlice/productsSlice';

export default function Showcase() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const products = useAppSelector(selectProducts);

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    return (
        <h1>
            Showcase
            {products.map((product, index) => (
                <div key={index}>
                    <p>{product.id}</p>
                    <p onClick={() => navigate(`/${product.id}`)}>productClick</p>
                </div>
            ))}
        </h1>
    );
}
