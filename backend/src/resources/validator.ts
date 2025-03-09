import { string } from '../../node_modules/yup/lib/index';
import { schemas } from '../schemas';
const jsonschema = require('jsonschema');

export class InvalidRequestBody extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class InvalidParam extends Error {
    constructor(message: string) {
        super(message);
    }
}

const validateRequestBodyImpl = (schemaName: string, objectToValidate: any, args: object) => {
    console.assert(schemas[schemaName] != null, `no such schema: '${schemaName}'`);
    try {
        jsonschema.validate(objectToValidate, schemas[schemaName], { throwError: true, allowUnknownAttributes: false, ...args });
    } catch (err) {
        if (err instanceof jsonschema.ValidationError) {
            throw new InvalidRequestBody(`Invalid request body: '${err}' (see ${schemaName} in /api-docs)`)
        } else {
            throw err; // will lead to internal server error on the request
        }
    }
}

export const validateRequestBody = (schemaName: string, objectToValidate: any) => {
    validateRequestBodyImpl(schemaName, objectToValidate, {});
}

export const stringParam = (param: any): string => {
    if (typeof param !== 'string') {
        throw new InvalidParam("required parameter path parameter is missing or is not a string");
    }
    return param as string;
}