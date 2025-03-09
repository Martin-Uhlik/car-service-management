import prisma from '../client';
import { permit, AuthError } from './accessControl';
import { withErrorHandling } from './utils';
import { Request, Response } from 'express';


export const getAllCars = withErrorHandling(async (req: Request, res: Response) => {
    const customerId = permit.anyCustomer(req.query.authToken);

    const cars = await prisma.car.findMany({
        where: {
            customerId
        }
    })

    res.send({
        error: null,
        data: cars
    });
});
