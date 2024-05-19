import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { selectProducts } from '../../redux/slices/productsSlice/productsSelectors';
import { fetchProducts } from '../../redux/slices/productsSlice/productsSlice';
import { useNavigate } from 'react-router-dom';

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
                <p key={index}>{product.id}</p>
            ))}
            <p onClick={() => navigate('/12345')}>productClick</p>
        </h1>
    );
}