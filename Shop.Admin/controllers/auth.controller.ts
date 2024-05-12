import { Router, Request, Response, NextFunction } from 'express';
import { throwServerError } from './helper';
import { verifyRequisites } from '../models/auth.model';
import { IAuthRequisites } from '@Shared/types';

export const authRouter = Router();

authRouter.get('/login', async (req: Request, res: Response) => {
    try {
        res.render('login');
    } catch (e) {
        throwServerError(res, e);
    }
});

authRouter.post('/authenticate', async (req: Request<{}, {}, IAuthRequisites>,res: Response) => {
    try {
        const verified = await verifyRequisites(req.body);

        if (verified) {
            req.session.username = req.body.username;   // ДОПОЛНИТЕЛЬНО ПРИШЛОСЬ СДЕЛАТЬ
            res.redirect(`/${process.env.ADMIN_PATH}`);
        } else {
            res.redirect(`/${process.env.ADMIN_PATH}/auth/login`);
        }
    } catch (e) {
        throwServerError(res, e);
    }
});

export const validateSession = (req: Request, res: Response, next: NextFunction) => {
    if (req.path.includes('/login') || req.path.includes('/authenticate')) {
        next();
        return;
    }

    if (req.session?.username) {
        next();
    } else {
        res.redirect(`/${process.env.ADMIN_PATH}/auth/login`);
    }
}

authRouter.get('/logout', async (req: Request, res: Response) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.log('Something wen wrong with session destroying', err);
            }
            res.redirect(`/${process.env.ADMIN_PATH}/auth/login`);
        });
    } catch (e) {
        throwServerError(res, e);
    }
});