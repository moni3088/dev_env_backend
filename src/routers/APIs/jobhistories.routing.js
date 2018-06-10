import express from 'express';
import  jobsHistories_router from '../../controllers/jobhistories.controller';
import {validateToken} from "../middleware";
/**
 * @swagger
 * definitions:
 *  JobHistory:
 *      type: object
 *      required:
 *      - jobsId
 *      - employeeId
 *      - status
 *      - timestamp
 *      properties:
 *          jobsId:
 *              type: string
 *          employeeId:
 *              type: string
 *          status:
 *              type: string
 *          timestamp:
 *              type: string
 *
 */

let jobsHistoriesRouter = express.Router();

/**
 * @swagger
 * /jobHistories/all:
 *  get:
 *      tags:
 *      - jobHistory
 *      summary: get all history
 *      parameters:
 *          - in: header
 *            name: x-access-token
 *            schema:
 *              type: string
 *            required: true
 *      description: get all history of jobs if admin
 *      responses:
 *          201:
 *              description: ok
 *
 */
jobsHistoriesRouter.get('/all', (req, res) =>{ //needs token
    //TO DO return all job history data if token validates that this is admin
});

// /**
//  * @swagger
//  * /jobHistories:
//  *  post:
//  *      tags:
//  *      - jobHistory
//  *      summary: post history
//  *      parameters:
//  *          - in: header
//  *            name: x-access-token
//  *            schema:
//  *              type: string
//  *            required: true
//  *      description: create job history
//  *      responses:
//  *          201:
//  *              description: ok
//  *
//  */
// jobsHistoriesRouter.post('/', validateToken, (req, res) => {
//
//     console.log('you are posting job');
//
// });

export default jobsHistoriesRouter;