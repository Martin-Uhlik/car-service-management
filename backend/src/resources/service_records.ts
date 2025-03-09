import prisma from '../client';
import { Request, Response } from 'express';
import { permit } from './accessControl';
import { withErrorHandling } from './utils';
import { validateRequestBody, stringParam } from './validator';
import { string } from '../../node_modules/yup/lib/locale';


export const get = withErrorHandling(async (req: Request, res: Response) => {
    permit.anyTechnician(req.query.authToken);
    
    const serviceRecord = await prisma.serviceRecord.findMany({});
    return res.send({
        error: null,
        data: serviceRecord,
    });
});

export const getById = withErrorHandling(async (req: Request, res: Response) => {
    permit.anyTechnician(req.query.authToken);

    const serviceRecord = await prisma.serviceRecord.findUnique({
        where: {
            id: stringParam(req.params.serviceRecordId),
        },
    });
    return res.send({
        error: null,
        data: serviceRecord,
    });
});

export const patchById = withErrorHandling(async (req: Request, res: Response) => {
    permit.anyTechnician(req.query.authToken);
    validateRequestBody("ServiceRecordData__patch", req.body);
    
    const serviceRecord = await prisma.serviceRecord.update({
        where: {
            id: stringParam(req.params.serviceRecordId)
        },
        data: {
            description: req.body.description,
            kmCount: req.body.kmCount,
            carId: stringParam(req.params.carId)
            //TODO: invoice data here
        },
    });

    return res.send({
        error: null,
        data: serviceRecord,
    });
});


export const getParts = withErrorHandling(async (req: Request, res: Response) => {
    const parts = await prisma.part.findMany({
        include: {
            serviceRecord: {
                include: {
                    car: {
                        select: {
                            customerId: true
                        }
                    }
                }
            }
        },
        where: {
            serviceRecordId: stringParam(req.params.serviceRecordId)
        },
    });

    permit.anyTechnicianOrSpecificCustomer(req.query.authToken, parts[0]?.serviceRecord?.car?.customerId);

    return res.send({
        error: null,
        data: parts,
    });
});

export const postPart = withErrorHandling(async (req: Request, res: Response) => {
    permit.anyTechnician(req.query.authToken);
    validateRequestBody("PartData", req.body)
    
    const parts = await prisma.part.create({
       data: {
           ...req.body,
           serviceRecordId: stringParam(req.params.serviceRecordId)
        }

    });

    return res.send({
        error: null,
        data: parts,
    });
});