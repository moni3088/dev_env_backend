import express from 'express';
import jobsController from '../../controllers/jobs.controller';
import  {validateToken}  from '../middleware';

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
 *          status:
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
 * /jobs/{id}:
 *  get:
 *      tags:
 *      - jobs
 *      summary: get job by id
 *      parameters:
 *          - in: path
 *            name: id
 *          - in: header
 *            name: x-access-token
 *            schema:
 *              type: string
 *            required: true
 *      description: get a job based on its id
 *      responses:
 *          201:
 *              description: ok
 *
 */
jobsRouter.get('/:id', validateToken, (req, res) =>{
    jobsController.getJob_byJobId(req.params.id).then(job => {
        res.send(job);
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
    jobsController.addNewJob(req.body, req.body.decoded).then(created =>{
        console.log('Created response: ', created);
        res.send(created);
    },err => {
        console.log('I actually ended up here for an unknown reason! ');
        res.status(404);
        res.send(err)
    })
});



export default jobsRouter;