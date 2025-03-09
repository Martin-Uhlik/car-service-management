import prisma from '../client';
import { Request, Response } from 'express';
import { permit } from './accessControl';
import { withErrorHandling } from './utils';


export const get = withErrorHandling(async (req: Request, res: Response) => {
    permit.anyTechnician(req.query.authToken);
    
    const invoice = await prisma.invoice.findMany({});
    return res.send({
        status: 'success',
        data: invoice,
    });
});

export const post = withErrorHandling(async (req: Request, res: Response) => {
    permit.anyTechnician(req.query.authToken);
    
    const invoice = await prisma.invoice.create({
        data: {
            ...req.body, // FIXME
            id: undefined
        }
    });
    return res.status(201).send(invoice);
});


export const getById = withErrorHandling(async (req: Request, res: Response) => {
    permit.anyTechnician(req.query.authToken);

    const id = req.params.id!;
    const invoice = await prisma.invoice.findUnique({
        where: {
            id: id,
        },
    });
    return res.send({
        error: null,
        data: invoice,
    });
});


export const patchSingle = withErrorHandling(async (req: Request, res: Response) => {
    permit.anyTechnician(req.query.authToken);
    
    const id = req.params.id;

    const invoice = await prisma.invoice.update({
        where: {
            id: id
        },
        data: req.body //FIXME: validation needed
    });

    return res.send({
        status: 'success',
        data: invoice,
    });
});