import {NextFunction, Request, Response} from "express";
import {HttpStatus} from "../types/http-status";
export const superAdminGuardMiddleware = (
    req: Request, res: Response, next:NextFunction
) => {
    const auth = req.headers['authorization' ] as string;

    if (!auth) {
        return res.sendStatus(HttpStatus.Unauthorized_401);
    }

    const[username, password] = auth.split(':');
    if (username!== 'admin' || password !== 'qwerty') {return res.sendStatus(HttpStatus.Unauthorized_401)}

    next();
}

