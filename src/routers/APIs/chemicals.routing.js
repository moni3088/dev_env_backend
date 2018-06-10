import express from 'express';
import  chemicalsController from '../../controllers/chemicals.controller';
import warehouses_chemicalsController from '../../controllers/warehouses_chemicals.controller';
import {validateToken} from "../middleware";
import _ from 'lodash';

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
 *  WarehousesChemicals:
 *      type: object
 *      required:
 *      - warehouseid
 *      - chemicalid
 *      - chemicalquantity
 *      properties:
 *          warehouseid:
 *              type: integer
 *          chemicalid:
 *              type: integer
 *          chemicalquantity:
 *              type: number
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

/**
 * @swagger
 * /chemicals/warehouses/{chemicalid}:
 *  get:
 *      tags:
 *      - warehouses&chemicals
 *      summary: get warehouses where a chemical exists
 *      parameters:
 *          - in: path
 *            name: chemicalid
 *          - in: header
 *            name: x-access-token
 *            schema:
 *              type: string
 *            required: true
 *      description: get all warehouses that currently have a specific chemical
 *      responses:
 *          201:
 *              description: ok
 *
 */
chemicalsRouter.get('/warehouses/:chemicalid', validateToken, (req, res) =>{
    console.log('req.params.chemicalid ', req.params.chemicalid);
    warehouses_chemicalsController.getAllWarehouses_byChemicalId(req.params.chemicalid).then(warehouses => {
        let groupWarehouses = _.groupBy(warehouses, 'chemicalid');
        res.send(groupWarehouses);
    }).catch((err)=>{
        res.status(404);
        res.send(err)
    });
});

/**
 * @swagger
 * /chemicals/chem_wareh/:
 *  get:
 *      tags:
 *      - warehouses&chemicals
 *      summary: get all data
 *      parameters:
 *          - in: header
 *            name: x-access-token
 *            schema:
 *              type: string
 *            required: true
 *      description: get all warehouses and chemicals from this table
 *      responses:
 *          201:
 *              description: ok
 *
 */
chemicalsRouter.get('/chem_wareh', validateToken, (req, res) =>{
    warehouses_chemicalsController.getAllData().then(data => {
        let groupWarehouses = _.groupBy(data, 'warehouseid');
        res.send(groupWarehouses);
    }).catch((err)=>{
        res.status(404);
        res.send(err)
    });
});

/**
 * @swagger
 * /chemicals/chem_wareh/:
 *  post:
 *      tags:
 *      - warehouses&chemicals
 *      summary: add warehouses and chemicals to table
 *      parameters:
 *          - in: header
 *            name: x-access-token
 *            schema:
 *              type: string
 *          - in: body
 *            name: data
 *            schema:
 *              $ref: '#/definitions/Warehouses&Chemicals'
 *      description: add chemical id and their corresponding warehouses to the table
 *      responses:
 *          201:
 *              description: ok
 *
 */
chemicalsRouter.post('/chem_wareh', validateToken, (req, res) =>{
    warehouses_chemicalsController.addDataToWarehouseAndChemicals(req.body).then(warehouses => {
        res.send(warehouses);
    }).catch((err)=>{
        res.status(404);
        res.send(err)
    });
});

/**
 * @swagger
 * /chemicals/updateinventory/:
 *  put:
 *      tags:
 *      - warehouses&chemicals
 *      summary: edit chemical quantity
 *      parameters:
 *          - in: header
 *            name: x-access-token
 *            schema:
 *              type: string
 *          - in: body
 *            name: data
 *            schema:
 *              $ref: '#/definitions/WarehousesChemicals'
 *      description: edit chemical quantity so it reflects the total/overall situation of the quantity in that warehouse
 *      responses:
 *          201:
 *              description: ok
 *
 */
chemicalsRouter.put('/updateinventory/', (req,res)=>{
    warehouses_chemicalsController.updateInventory(req.body).then(response => {
        res.send(response);
    }).catch((err)=>{
        res.status(404);
        res.send(err);
    });
});

export default chemicalsRouter;