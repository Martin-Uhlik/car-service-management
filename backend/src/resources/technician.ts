import prisma from '../client';
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { withErrorHandling } from './utils';
import { createToken, permit, createHashSaltPair } from './accessControl';
import { validateRequestBody, stringParam } from './validator';


// FIXME: move this somewhere more reasonable
prisma.technician.upsert({
    where: {
        username: "admin"
    },
    update: {},
    create: {
        username: "admin",
        ...createHashSaltPair("admin"),
        name: "admin",
        surname: "admin",
    }
}).then().catch(() => console.error("failed to create admin account"));

export const login = withErrorHandling(async (req: Request, res: Response) => {
    validateRequestBody("LoginData", req.body);

    const technician = await prisma.technician.findUnique({
        where: {
            username: req.body.username,
        },
    });

    if (technician == null) {
        return res.status(404).send({
            error: "Technician with given username is not registered.",
            data: null
        });
    }

    const loginToken = createToken.loginTechnician({
        token: { technicianId: technician.id, isAdmin: technician.username === "admin" },
        passwordToCheck: req.body.password,
        hash: technician.passwordHash,
        salt: technician.passwordSalt
    })

    if (loginToken == null) {
        return res.send({
            error: "inccorect password",
            data: null
        });
    }

    return res.json({
        error: null,
        data: {
            authToken: loginToken,
            id: technician.id,
            name: technician.name,
            surname: technician.surname,
            phone: technician.phone,
            email: technician.email
        }
    });
});

export const register = withErrorHandling(async (req: Request, res: Response) => {
    permit.anyAdmin(req.query.authToken);
    validateRequestBody("RegisterData", req.body);

    const technician = await prisma.technician.create({
        data: {
            username: req.body.username,
            ...createHashSaltPair(req.body.password),
            name: req.body.name,
            surname: req.body.surname,
            phone: req.body.phone,
            email: req.body.phone,
        },
    });

    return res.status(201).send({
        error: null,
        data: technician
    });
});

export const deleteById = withErrorHandling(async (req: Request, res: Response) => {
    permit.anyAdmin(req.query.authToken);

    const technician = await prisma.technician.delete({
        where: {
            id: stringParam(req.params.technicianId)
        }
    });

    return res.send({
        error: null,
        data: technician,
    });
})

export const patchById = withErrorHandling(async (req: Request, res: Response) => {
    permit.anyAdmin(req.query.authToken);
    validateRequestBody("RegisterData__patch", req.body);

    const technician = await prisma.technician.update({
        where: {
            id: stringParam(req.params.technicianId)
        },
        data: {
            username: req.body.username,
            ...createHashSaltPair(req.body.password),
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            phone: req.body.phone
        }
    });

    return res.send({
        error: null,
        data: technician,
    });
});

export const selfPatchById = withErrorHandling(async (req: Request, res: Response) => {
    const technicianId = stringParam(req.params.technicianId);
    permit.specificTechnician(req.query.authToken, technicianId);
    validateRequestBody("RegisterDataSelfPatch", req.body);

    let technician = await prisma.technician.findUnique({
        where: {
            id: technicianId
        }
    });
    if (technician == null) {
        return res.send({
            error: "no such user",
            data: null
        });
    }

    const authToken = createToken.loginTechnician({
        token: { technicianId: technicianId, isAdmin: false },
        passwordToCheck: req.body.oldPassword,
        hash: technician.passwordHash,
        salt: technician.passwordSalt
    });

    if (authToken == null) {
        return res.send({
            error: "incorect oldPassword",
            data: null
        });
    }

    technician = await prisma.technician.update({
        where: {
            id: stringParam(req.params.technicianId)
        },
        data: {
            name: req.body.name,
            surname: req.body.surname,
            phone: req.body.phone,
            email: req.body.email,
            ...(req.body.password != null? createHashSaltPair(req.body.password) : {})
        }
    });

    return res.send({
        error: null,
        data: technician,
    });
});

export const get = withErrorHandling(async (req: Request, res: Response) => {
    permit.anyAdmin(req.query.authToken);

    const technicians = await prisma.technician.findMany({});
    return res.send({
        error: null,
        data: technicians,
    });
});
