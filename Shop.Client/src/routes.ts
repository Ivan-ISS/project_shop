// const API_HOST = `http://${process.env.LOCAL_HOST}:${process.env.LOCAL_PORT}/${process.env.API_PATH}`;
//export const LOCAL_HOST_PORT = 'http://localhost:3000';
export const LOCAL_HOST_PORT = '';
export const API_HOST = `${LOCAL_HOST_PORT}/api`;

interface IRoutes {
    home: () => string;
    productsList: () => string;
    product: () => string;
    notFound: () => string;
    urlProducts: () => string;
    urlComment: () => string;
}

const routes: IRoutes = {
    home: () => '/',
    productsList: () => '/products-list',
    product: () => '/:id',
    notFound: () => '/*',
    urlProducts: () => `${API_HOST}/products`,
    urlComment: () => `${API_HOST}/comments`,
};

export default routes;