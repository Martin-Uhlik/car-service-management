import prisma from '../client';
import { Request, Response } from 'express';
import { permit } from './accessControl';
import { withErrorHandling } from './utils';
import { validateRequestBody, stringParam } from './validator';
import { createToken } from './accessControl';    


export const get = withErrorHandling(async (req: Request, res: Response) => {
    permit.anyTechnician(req.query.authToken);
    
    const customers = await prisma.customer.findMany({});
    return res.send({
        error: null,
        data: customers,
    });
});

export const getById = withErrorHandling(async (req: Request, res: Response) => {
    permit.anyTechnician(req.query.authToken);
    
    const customer = await prisma.customer.findUnique({
        where: {
            id: stringParam(req.params.customerId)
        }
    });
    return res.send({
        error: null,
        data: customer,
    });
});


export const post = withErrorHandling(async (req: Request, res: Response) => {
    permit.anyTechnician(req.query.authToken);
    validateRequestBody("CustomerData", req.body);
    
    const customers = await prisma.customer.create({
        data: {
            ...req.body
        }
    })
    return res.send({
        error: null,
        data: customers,
    });
});


export const patchById = withErrorHandling(async (req: Request, res: Response) => {
    permit.anyTechnician(req.query.authToken);
    validateRequestBody("CustomerData__patch", req.body);

    const customer = await prisma.customer.update({
        where: {
            id: stringParam(req.params.customerId)
        },
        data: req.body
    });

    return res.send({
        error: null,
        data: customer,
    });
});

export const getCars = withErrorHandling(async (req: Request, res: Response) => {
    const customerId = stringParam(req.params.customerId);
    permit.anyTechnicianOrSpecificCustomer(req.query.authToken, customerId);
    
    const customer = await prisma.car.findMany({
        where: {
            customerId: customerId
        },
    });

    return res.send({
        error: null,
        data: customer,
    });
});

export const getServiceRecords = withErrorHandling(async (req: Request, res: Response) => {
    const customerId = stringParam(req.params.customerId);
    permit.anyTechnicianOrSpecificCustomer(req.query.authToken, customerId);
    
    const carsIds = await prisma.car.findMany({
        where: {
            customerId: customerId
        },
        select: {
            id: true
        }
    });

    const servicerecords =  await prisma.serviceRecord.findMany({
        where: {
            carId: {
                in: carsIds.map((obj: { id: string; }) => obj.id)
            }
        },
    });

    return res.send({
        error: null,
        data: servicerecords,
    });
});

export const createAccessToken = withErrorHandling(async (req: Request, res: Response) => {
    permit.anyTechnician(req.query.authToken);
    res.send({
        error: null,
        data: {
            authToken: createToken.customerToken({ customerId: stringParam(req.params.customerId) })
        }
    });
});
