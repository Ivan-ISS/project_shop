import express, { Express } from "express";
import { Connection } from "mysql2/promise";
import { commentsRouter } from './src/api/comments-api';
import { productsRouter } from './src/api/products-api';
import { authRouter } from './src/api/auth-api';

export let connection: Connection;

export default function (dbConnection: Connection): Express {
    const app = express();
    app.use(express.json());

    connection = dbConnection;  // Наше connection (соединение с БД) экспортируется от сюда (строка выше) в api и там оно используется для выполнения запросов к БД

    app.use('/comments', commentsRouter);
    app.use('/products', productsRouter);
    app.use('/auth', authRouter);

    return app; // здесь получается возвращается как бы часть приложения (все отличие в том что нет вот этого слушателя app.listen(8000, () => {})
}               // вот это app и будет использоваться как часть общего app, который определен в сервере (сервере - он так наз-ся, т.к. там есть этот слушатель)
                // все это объединяется в файле index.ts в корне общего проекта Shop.Project