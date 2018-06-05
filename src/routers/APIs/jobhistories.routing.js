import express from 'express';
import  jobsHistories_router from '../../controllers/jobhistories.model';
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

export default jobsHistoriesRouter;