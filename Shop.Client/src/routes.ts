const url = 'http://localhost:8000/api/products';

interface IRoutes {
    home: () => string;
    productsList: () => string;
    product: () => string;
    notFound: () => string;
    url: () => string;
}

const routes: IRoutes = {
    home: () => '/',
    productsList: () => '/products-list',
    product: () => '/:id',
    notFound: () => '/*',
    url: () => url,
};

export default routes;