import { Request, Response } from 'express';
import { AuthError, AccessDeniedError } from './accessControl';
import { Prisma } from '@prisma/client';
import { InvalidRequestBody } from './validator';

const handleError = (err: any, res: Response) => {
    //TODO: rewrite
    if (err instanceof AuthError) {
        res.status(400).send({
            error: err.message,
            data: null
        });
    } else if (err instanceof AccessDeniedError) {
        res.status(403).send({
            error: err.message,
            data: null
        });
    } else if (err instanceof Prisma.PrismaClientKnownRequestError || err instanceof InvalidRequestBody) {
        res.status(400).send({
            error: err.message,
            data: null
        });
    } else {
        console.log(err)
        res.status(500).send({
            error: "unknown error",
            data: null
        });
    }
}


export const withErrorHandling = (handler: (req: Request, res: Response) => void): ((req: Request, res: Response) => void) => {
    return async (req: Request, res: Response) => {
        try {
            // the await here is actually neccessary despite being underlined by VS code, is the type signature wrong?
            await handler(req, res);
        } catch (err) {
            handleError(err, res)
        }
    };
}