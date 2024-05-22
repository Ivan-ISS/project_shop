import { useEffect } from 'react';
import { useAppDispatch } from './redux/store';
import { fetchProducts } from './redux/slices/productsSlice/productsSlice';
import Layout from './Components/Layout/layout';

export default function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <Layout/>
    );
}