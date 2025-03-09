import YAML from 'yamljs';
import path from 'path';
import fs from 'fs';

console.log("TODO: is this loaded multiple times?")
type SchemasType = { [schemaName: string]: [any] }

const createPatchedVaraint = (schema: any) => {
    const result = {...schema, properties: {}};
    for (const [propName, prop] of Object.entries(schema.properties)) {
        result.properties[propName] = {...(prop as object), required: false};
    }  
    return result;
}

const loadSchemas = (dirPath: string) => {
    const schemas: SchemasType = {};
    const filenames = fs.readdirSync(dirPath);
    for (const filename of filenames) {
        const match = filename.match(/(\w*)\.yaml/);
        if (match) {
            const name = match[1];
            const schemaPath = path.join(dirPath, filename);
            const schema = YAML.load(schemaPath);
            const keys = Object.keys(schema);
            console.log(name, "loading", keys);
            if(keys.length != 1 || keys[0] !== name){
                throw new Error(`${schemaPath} : expected exactly one top level key that matches filename, ingoring this file.`)
            }
            schemas[name] = schema[name];
            schemas[`${name}__patch`] = createPatchedVaraint(schema[name]);
        } else {
            console.log(`ignoring file '${filename}' with incorrect name in schemas.`)
        }
    };
    return schemas;
}

export const schemas: SchemasType = loadSchemas(path.join(__dirname, '../schemas'));
export default schemas;