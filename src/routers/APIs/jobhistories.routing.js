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
 *  JobHistoryUpdate:
 *      type: object
 *      required:
 *      - id
 *      - status
 *      properties:
 *          id:
 *              type: string
 *          status:
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

/**
 * @swagger
 * /jobHistories/update:
 *  post:
 *      tags:
 *      - jobHistory
 *      summary: add job history
 *      parameters:
 *          - in: header
 *            name: x-access-token
 *            schema:
 *              type: string
 *          - in: body
 *            name: data
 *            schema:
 *              $ref: '#/definitions/JobHistoryUpdate'
 *      description: add job history to be used only when an existing job gets a new status
 *      responses:
 *          201:
 *              description: ok
 *
 */
jobsHistoriesRouter.post('/update', validateToken, (req, res) =>{
    let object = {
        id: req.body.id,
        email: req.body.decoded.email,
        status: req.body.status
    };
    jobsHistoriesController.addJobHistory(object).then(created =>{
        console.log('Created response: ', created);
        res.send(created);
    },err => {
        res.status(404);
        res.send(err)
    })
});

export default jobsHistoriesRouter;