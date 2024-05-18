import { Routes, Route } from 'react-router-dom';
import routes from '../../routes';
import Home from '../Pages/home';
import Showcase from '../Pages/showcase';
import Product from '../Pages/product';
import NotFound from '../Pages/notFound';

export default function Default() {

    return (
        <Routes>
            <Route path={ routes.home() } element={<Home/>}></Route>
            <Route path={ routes.productsList() } element={<Showcase/>}></Route>
            <Route path={ routes.product() } element={<Product/>}></Route>
            <Route path={ routes.notFound() } element={<NotFound/>}></Route>
        </Routes>
    );
}