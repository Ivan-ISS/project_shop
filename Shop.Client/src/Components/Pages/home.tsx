import { Link } from 'react-router-dom';
// import { IProduct } from '@Shared/types';

export default function Home() {

    return (
        <div>
            <h1>
                Shop.Client
            </h1>
            <button>
                <Link to={'/products-list'}>
                    К списку товаров
                </Link>
            </button>
            <button>
            <a href="/admin/auth/login">
                В панель администрирования
            </a>
            </button>
        </div>
    );
}