require('dotenv').config();
import express, { Express } from "express";
import { Connection } from "mysql2/promise";
import { initDataBase } from "./Server/services/db";
import { initServer } from "./Server/services/server";
import ShopAPI from './Shop.API';
import ShopAdmin from  './Shop.Admin'
import { Server } from "socket.io";
import { initSocketServer } from "./Server/services/socket";
import * as path from 'path';

export let server: Express;
export let connection: Connection | null;
export let ioServer: Server;

async function launchApplication() {
    server = initServer();
    connection = await initDataBase();
    ioServer = initSocketServer(server);

    initRouter();
}

function initRouter() {
    const shopApi = ShopAPI(connection);
    server.use('/api', shopApi);

    const shopAdmin = ShopAdmin();
    server.use('/admin', shopAdmin);

    const ShopClient = path.join(__dirname, './Shop.Client/dist', 'index.html');    // путь до React приложения
    server.use(express.static(path.join(__dirname, './Shop.Client/dist')));         // для предоставления доступа к папке dist React приложения (статические файлы)
    server.get('/*', (_, res) => {
        res.sendFile(ShopClient);                                                   // раньше была заглушка - res.send('React App');
    })
}

launchApplication();