import {NextFunction, Request, Response} from "express";
import {HttpStatus} from "../types/http-status";
export const superAdminGuardMiddleware = (
    req: Request, res: Response, next:NextFunction
) => {
    const auth = req.headers['authorization'] as string;

    if (!auth) {
        return res.sendStatus(HttpStatus.Unauthorized_401);
    }


    const[authType, token] = auth.split(' ');
    if (authType!== 'Basic' || token ) {
        return res.sendStatus(HttpStatus.Unauthorized_401);
    }

    const decoded = Buffer.from(token, 'base64').toString('utf-8');

    const [ username, password ] = decoded.split(':');

    if (username !== 'admin' || password !== 'qwerty') {
        return res.sendStatus(HttpStatus.Unauthorized_401);
    }
    next();
};

