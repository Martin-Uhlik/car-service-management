import prisma from '../client';
import { Request, Response } from 'express';
import { permit } from './accessControl';
import { withErrorHandling } from './utils';
import { validateRequestBody, stringParam } from './validator';


export const getById = withErrorHandling(async (req: Request, res: Response) => {
    permit.anyTechnician(req.query.authToken);

    const part = await prisma.part.findUnique({
        where: {
            id: stringParam(req.params.partId),
        },
    });
    return res.send({
        error: null,
        data: part,
    });
});


export const patchById = withErrorHandling(async (req: Request, res: Response) => {
    permit.anyTechnician(req.query.authToken);
    validateRequestBody("PartData__patch", req.body);
    
    const part = await prisma.part.update({
        where: {
            id: stringParam(req.params.partId)
        },
        data: req.body
    });

    return res.send({
        error: null,
        data: part,
    });
});

export const deleteById = withErrorHandling(async (req: Request, res: Response) => {
    permit.anyTechnician(req.query.authToken);
    //validateRequestBody("PartData__patch", req.body);
    
    const part = await prisma.part.delete({
        where: {
            id: stringParam(req.params.partId)
        }
    });

    return res.send({
        error: null,
        data: part,
    });
})