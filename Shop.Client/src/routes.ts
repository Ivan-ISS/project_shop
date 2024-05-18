interface IRoutes {
    home: () => string;
    productsList: () => string;
    product: () => string;
    notFound: () => string;
}

const routes: IRoutes = {
    home: () => '/',
    productsList: () => '/products-list',
    product: () => '/:id',
    notFound: () => '/*'
};

export default routes;