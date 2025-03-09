import express, { application } from "express";
import { cars, technician, customers, invoice, parts, service_records } from "./resources";
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import cors from "cors";
import path from 'path';
import schemas from './schemas';

const swaggerDocument = YAML.load(path.join(__dirname, '../docs/swagger.yaml'));
console.assert(swaggerDocument?.components?.schemas != null, "no schemas object in swagger document");
swaggerDocument.components.schemas = { ...schemas, ...swaggerDocument.components.schemas };

const app = express();
const port = process.env.PORT ?? 4000;

app.use(express.json());
app.use(cors()); //TODO: is it needed?
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.post("/technicians/", technician.register);
app.post("/technicians/login", technician.login);
app.get("/technicians/", technician.get)
app.patch("/technicians/:technicianId", technician.patchById)
app.delete("/technicians/:technicianId", technician.deleteById)
app.patch("/technicians/:technicianId/self-patch", technician.selfPatchById)

app.get("/customers", customers.get);
app.post("/customers", customers.post);
app.get("/customers/:customerId", customers.getById);
app.patch("/customers/:customerId", customers.patchById);
app.post("/customers/:customerId/create-auth-token", customers.createAccessToken);
app.get("/customers/:customerId/cars", customers.getCars); 
app.get("/customers/:customerId/serviceRecords", customers.getServiceRecords);
// app.get("/customers/:customerId/invoices", customers.getInvoices); //TODO? or maybe remove invoices object fully

app.get("/cars", cars.get);
app.post("/cars", cars.post);
app.get("/cars/:carId", cars.getById);
app.patch("/cars/:carId", cars.patchById);
app.get("/cars/:carId/service-records", cars.getServiceRecords);
app.post("/cars/:carId/service-records", cars.postServiceRecord); 

app.get("/service-records/:serviceRecordId", service_records.getById);
app.patch("/service-records/:serviceRecordId", service_records.patchById); 
app.get("/service-records/:serviceRecordId/parts", service_records.getParts); 
app.post("/service-records/:serviceRecordId/parts", service_records.postPart);

app.get("/parts/:partId", parts.getById);
app.patch("/parts/:partId", parts.patchById);
app.delete("/parts/:partId", parts.deleteById);


app.listen(port, () => console.log(`Example app listening on port ${port}`));
console.log("****\n    see docs at http://localhost:4000/api-docs\n****")
