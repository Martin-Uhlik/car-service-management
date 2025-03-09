import prisma from '../client';
import { Request, Response } from 'express';
import { permit } from './accessControl';
import { withErrorHandling } from './utils';
import { validateRequestBody, stringParam } from './validator';


export const get = withErrorHandling(async (req: Request, res: Response) => {
    permit.anyTechnician(req.query.authToken);

    const cars = await prisma.car.findMany({});
    return res.send({
        error: null,
        data: cars,
    });
});

export const post = withErrorHandling(async (req: Request, res: Response) => {
    permit.anyTechnician(req.query.authToken);
    validateRequestBody("CarData", req.body);

    const car = await prisma.car.create({
        data: {
            ...req.body,
            production: new Date(req.body.production)
        }
    });
    return res.status(201).send({
        error: null,
        data: car,
    });
});

export const getById = withErrorHandling(async (req: Request, res: Response) => {

    const car = await prisma.car.findUnique({
        where: {
            id: stringParam(req.params.carId),
        },
    });

    permit.anyTechnicianOrSpecificCustomer(req.query.authToken, car?.customerId);

    return res.send({
        error: null,
        data: car,
    });
});

export const patchById = withErrorHandling(async (req: Request, res: Response) => {
    permit.anyTechnician(req.query.authToken);
    validateRequestBody("CarData__patch", req.body);

    const car = await prisma.car.update({
        where: {
            id: stringParam(req.params.carId)
        },
        data: req.body
    });

    return res.send({
        error: null,
        data: car,
    });
});

export const getServiceRecords = withErrorHandling(async (req: Request, res: Response) => {
    const car = await prisma.car.findUnique({
        where: {
            id: stringParam(req.params.carId)
        },
        select: {
            customerId: true,
        }
    });
    permit.anyTechnicianOrSpecificCustomer(req.query.authToken, car?.customerId);

    const serviceRecords = await prisma.serviceRecord.findMany({
        where: {
            carId: stringParam(req.params.carId)
        },
    });

    return res.send({
        error: null,
        data: serviceRecords,
    });
});

export const postServiceRecord = withErrorHandling(async (req: Request, res: Response) => {
    const technicianId = permit.anyTechnician(req.query.authToken);
    validateRequestBody("ServiceRecordData", req.body);

    const serviceRecord = await prisma.serviceRecord.create({
        data: {
            description: req.body.description,
            kmCount: req.body.kmCount,
            acceptedId: technicianId,
            carId: stringParam(req.params.carId)
            //TODO: invoice data here
        }
    })

    return res.send({
        error: null,
        data: serviceRecord,
    });

});
