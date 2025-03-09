import prisma from '../client';
import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import crypto, { sign } from 'crypto';
import jwt from 'jsonwebtoken'
import { technician } from './index';


interface TechnicianAuthToken {
    technicianId: string,
    isAdmin: boolean,
};

interface UserAuthToken {
    customerId: string,
}

type AuthToken = TechnicianAuthToken | UserAuthToken;

const SECRET: string = "TODO should really be a secret";

const hash = (password: string, salt: string) => {
    return crypto.scryptSync(password, salt, 64).toString("hex");
}

const createSalt = (): string => {
    return crypto.randomBytes(16).toString("hex")
}

const signToken = (authToken: AuthToken): string => {
    return jwt.sign(authToken, SECRET);
}

const verifyToken = <T,>(token: string): T | null => {
    try {
        return jwt.verify(token, SECRET) as T;
    } catch {
        throw new AuthError("Invalid authToken");
    }
}

export const createTokenCustomer = (userAuthToken: UserAuthToken): string => {
    return signToken(userAuthToken);
}

export const createHashSaltPair = (password: string): { passwordHash: string, passwordSalt: string } => {
    const salt = createSalt()
    return { passwordHash: hash(password, salt), passwordSalt: salt };
}

export const loginTechnician = (args: { token: TechnicianAuthToken, passwordToCheck: string, hash: string, salt: string }): string | null => {
    if (args.hash != hash(args.passwordToCheck, args.salt)) {
        return null;
    } else {
        return signToken(args.token)
    }
}

export class AuthError extends Error {
    constructor(message: string) {
        super(message)
    }
}

export class AccessDeniedError extends AuthError {
    constructor(message: string) {
        super(message)
    }
}

const checkTokenIsString = (authToken: any) => {
    if (authToken === undefined) {
        throw new AuthError("authToken is required");
    } else if (typeof authToken !== "string") {
        throw new AuthError("authToken must be a single string");
    }
}

const anyTechnician = (authToken: any): string => {
    checkTokenIsString(authToken);
    const token = verifyToken<any>(authToken);

    if (token.technicianId == null) {
        throw new AccessDeniedError("resource only accessible using technician authToken");
    }
    return token.technicianId;
}

// currently there exists only 1 admin account, "admin"
const anyAdmin = (authToken: any): string => {
    checkTokenIsString(authToken);
    const token = verifyToken<any>(authToken);

    if (token.technicianId == null || token.isAdmin !== true) {
        throw new AccessDeniedError("resource only accessible for administrator");
    }

    return token.technicianId;
}

/**
 * Check if this token is for a user and return their customerId
 */
const anyCustomer = (authToken: any): string => {
    checkTokenIsString(authToken);
    const token = verifyToken<any>(authToken);

    if (token.customerId == null) {
        throw new AccessDeniedError("resource only availible for customers");
    }

    return token.customerId
}

const specificCustomer = (authToken: any, customerId: string): void => {
    if (anyCustomer(authToken) !== customerId) {
        throw new AccessDeniedError("resource not accessible for this user")
    }
}

const specificTechnician = (authToken: any, technicianId: string): void => {
    if (anyTechnician(authToken) !== technicianId) {
        throw new AccessDeniedError("resource not accessible for this user")
    }
}

const anyTechnicianOrSpecificCustomer = (authToken: any, customerId: string | null | undefined): void => {
    if (customerId == null) {
        anyTechnician(authToken);
    } else {
        try {
            anyTechnician(authToken);
        } catch (err) {
            specificCustomer(authToken, customerId);
        }
    }
}

export const createToken = { customerToken: createTokenCustomer, loginTechnician: loginTechnician };
//TODO: add admin technician category
export const permit = { anyTechnician, specificCustomer, anyCustomer, anyTechnicianOrSpecificCustomer, anyAdmin, specificTechnician };
export default permit;
