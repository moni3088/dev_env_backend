import express from 'express';
import jobsController from '../../controllers/jobs.controller';
import jwt from 'jsonwebtoken';
import  {validateToken}  from '../middleware';
import employeesRouter from "./employees.routing";
/**
 * @swagger
 * definitions:
 *  Jobs:
 *      type: object
 *      required:
 *      - chemicalId
 *      - employeeId
 *      - warehouseId
 *      - status
 *      properties:
 *          chemicalId:
 *              type: string
 *          employeeId:
 *              type: string
 *          warehouseId:
 *              type: string
 *          status:
 *              type: string
 *          specialStatus:
 *              type: string
 *
 */

let jobsRouter = express.Router();

/**
 * @swagger
 * /jobs/all:
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
jobsRouter.get('/all', (req, res) =>{ // needs token

});

export default jobsRouter;