import express from 'express';
import  jobsHistoriesController from '../../controllers/jobhistories.controller';
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
jobsHistoriesRouter.get('/all', validateToken, (req, res) =>{ //needs token
    jobsHistoriesController.getAll_jobHistories().then(history => {
        res.send(history);
    }, err => {
        res.status(404).send(err);
    }).catch(err => {
        res.status(500).send(err);
    })
    //TO DO return all job history data if token validates that this is admin
});

export default jobsHistoriesRouter;