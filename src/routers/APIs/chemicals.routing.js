import express from 'express';
import  chemicalsController from '../../controllers/chemicals.controller';
import {validateToken} from "../middleware";
/**
 * @swagger
 * definitions:
 *  Chemicals:
 *      type: object
 *      required:
 *      - type
 *      - quantity
 *      properties:
 *          type:
 *              type: string
 *          quantity:
 *              type: number
 *
 */

let chemicalsRouter = express.Router();

/**
 * @swagger
 * /chemicals/all:
 *  get:
 *      tags:
 *      - chemicals
 *      summary: get all chemicals
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
chemicalsRouter.get('/all', validateToken, (req, res) =>{
    chemicalsController.getAllChemicals().then(chemicals =>{
        res.send(chemicals);
    }).catch((err)=>{
        res.status(404);
        res.send(err)
    });
});

/**
 * @swagger
 * /chemicals/add:
 *  post:
 *      tags:
 *      - chemicals
 *      summary: add chemical to the system
 *      parameters:
 *          - in: header
 *            name: x-access-token
 *          - in: body
 *            name: chemical
 *            schema:
 *              $ref: '#/definitions/Chemicals'
 *      description: add a new chemical to the system only for admin user (this isn't a often feature!!!)
 *      responses:
 *          201:
 *              description: ok
 *
 */
chemicalsRouter.post('/add', validateToken, (req, res) =>{
    if(req.decoded.role === 'admin'){
        chemicalsController.addNewChemicalToTheSystem(req.body).then(chemical => {
            res.send(chemical);
        }).catch((err)=>{
            res.status(404);
            res.send(err)
        });
    }else{
        res.status(401);
        res.send('no admin privilege');
    }
});

export default chemicalsRouter;