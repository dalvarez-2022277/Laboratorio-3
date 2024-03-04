"use strict";

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import userRouter from '../src/user/user.routes.js';
import authRouter from '../src/auth/auth.routes.js';
import empesasRouter from '../src/empresas/empresas.routes.js';
import reporteRouter from '../src/empresas/empresas.routes.routes.js';
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/gestion-Empresas/v1/usuarios';
        this.autPath = '/gestion-Empresas/v1/auth';
        this.empresaPath = '/gestion-Empresas/v1/empresas';
        this.reportePath = '/gestion-Empresas/v1/reportes';
        this.middlewares();
        this.dbconection();
        this.routes();
    }

    async dbconection(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }


    routes(){
        this.app.use(this.userPath, userRouter);
        this.app.use(this.autPath, authRouter);
        this.app.use(this.empresaPath, empesasRouter);
        this.app.use(this.reportePath, reporteRouter);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server ejecutandose en el puerto', this.port);
        });
    }
}

export default Server;