import express from 'express';
import bodyParser from 'body-parser';
import Swagger from './src/services/swagger.service';
import cors from  'cors';
import {SwaggerRoute, imageRouter,
    employeesRouting, jobsRouting, jobsHistoriesRouting, chemicalsRouting, warehouseRouting} from './src/routers/index.routing';

let app = express();
const port = process.env.PORT || 7777;
let swagger = new Swagger();

app.use(cors());
app.disable('etag');
app.use(bodyParser.json({limit: '5mb'}) );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true,
    limit: '5mb'
}));

app.use('/images', express.static('dist/assets/images/event'));
app.use('/img', imageRouter);
app.use('/employees', employeesRouting);
app.use('/jobs', jobsRouting);
app.use('/jobHistories', jobsHistoriesRouting);
app.use('/chemicals', chemicalsRouting);
app.use('/warehouses', warehouseRouting);
// Swagger
app.use('/api-docs', swagger.swaggerUi.serve, swagger.swaggerUi.setup(swagger.swaggerSpec));
app.use('/swagger', SwaggerRoute);

app.listen(port);
console.log('todo list RESTful API server started on: ' + port);