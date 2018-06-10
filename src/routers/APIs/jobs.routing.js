import express from 'express';
import jobsController from '../../controllers/jobs.controller';
import jwt from 'jsonwebtoken';
import  {validateToken}  from '../middleware';
import employeesRouter from "./employees.routing";
import warehouses_chemicalsController from "../../controllers/warehouses_chemicals.controller";
import chemicalsRouter from "./chemicals.routing";
/**
 * @swagger
 * definitions:
 *  Jobs:
 *      type: object
 *      required:
 *      - warehouseId
 *      - chemicaltype
 *      - chemicalquantity
 *      - status
 *      properties:
 *          warehouseid:
 *              type: number
 *          chemicaltype:
 *              type: string
 *          chemicalquantity:
 *              type: number
 *          special_status:
 *              type: string
 *
 */

let jobsRouter = express.Router();

/**
 * @swagger
 * /jobs:
 *  get:
 *      tags:
 *      - jobs
 *      summary: get all jobs
 *      parameters:
 *          - in: header
 *            name: x-access-token
 *            schema:
 *              type: string
 *            required: true
 *      description: get all existing jobs if admin
 *      responses:
 *          201:
 *              description: ok
 *
 */
jobsRouter.get('/', (req, res) =>{ // needs token
    jobsController.getAllJobs().then(jobs =>{
        res.send(jobs);
    }).catch((err)=>{
        res.status(404);
        res.send(err)
    });
});
/**
 * @swagger
 * /jobs:
 *  post:
 *      tags:
 *      - jobs
 *      summary: add a new job
 *      parameters:
 *          - in: header
 *            name: x-access-token
 *            schema:
 *              type: string
 *          - in: body
 *            name: data
 *            schema:
 *              $ref: '#/definitions/Jobs'
 *      description: add a new job with all its data to the db
 *      responses:
 *          201:
 *              description: ok
 *
 */
jobsRouter.post('/', validateToken, (req, res) =>{
    jobsController.addNewJob(req.body, req.decoded).then(created =>{
        res.send(created);
    },err => {
        res.status(404);
        res.send(err)
    } ).catch((err)=>{
        res.status(404);
        res.send(err)
    });
});



export default jobsRouter;