const url = 'http://localhost:8000/api/products';
const urlComment = 'http://localhost:8000/api/comments';

interface IRoutes {
    home: () => string;
    productsList: () => string;
    product: () => string;
    notFound: () => string;
    url: () => string;
    urlComment: () => string;
}

const routes: IRoutes = {
    home: () => '/',
    productsList: () => '/products-list',
    product: () => '/:id',
    notFound: () => '/*',
    url: () => url,
    urlComment: () => urlComment,
};

export default routes;