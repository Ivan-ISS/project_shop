import express, { Express, Request, Response, NextFunction } from "express";
import bodyParser from 'body-parser';
import { productsRouter } from './controllers/products.controller';
import { authRouter, validateSession } from './controllers/auth.controller';
import layouts from 'express-ejs-layouts';
import session from "express-session";

export default function (): Express {
    const app = express();

    app.use(session({
        secret: process.env.SESSION_SECRET,
        saveUninitialized: false,
        resave: false
    }));

    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use((req: Request, res: Response, next: NextFunction) => {
        res.locals.showHeaderMenu = true;
        next();
    })

    app.set('view engine', 'ejs');
    app.set('views', 'Shop.Admin/views');

    app.use(layouts);

    app.use(express.static(__dirname + '/public'));

    app.use(validateSession);

    app.use("/auth", authRouter);
    app.use('/', productsRouter)    // Здесь изначально вместо роутера был помещен обычный обработчик по пути app.use('/', (_, res) => {res.send('Admin panel');})

    return app;
}