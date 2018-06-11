import express from 'express';
import warehouseController from '../../controllers/warehouses.controller';
import warehouses_chemicalsController from '../../controllers/warehouses_chemicals.controller';
import  {validateToken}  from '../middleware';

/**
 * @swagger
 * definitions:
 *  Warehouses:
 *      type: object
 *      required:
 *      - id
 *      - maxstorage
 *      properties:
 *          id:
 *            type: integer
 *          maxstorage:
 *              type: number
 *  Warehouses&Chemicals:
 *      type: object
 *      required:
 *      - id
 *      - warehouseid
 *      - chemicalid
 *      properties:
 *          id:
 *            type: integer
 *          warehouseid:
 *              type: number
 *          chemicalid:
 *              type: number
 */

let warehousesRouter = express.Router();

/**
 * @swagger
 * /warehouses/all:
 *  get:
 *      tags:
 *      - warehouses
 *      summary: get all warehouses
 *      parameters:
 *          - in: header
 *            name: x-access-token
 *            schema:
 *              type: string
 *            required: true
 *      description: get all warehouses if there is a token no matter the role
 *      responses:
 *          201:
 *              description: ok
 *
 */
warehousesRouter.get('/all', validateToken, (req, res) =>{
        warehouseController.getAllWarehouses().then(warehouses => {
            res.send(warehouses);
        }).catch((err)=>{
            res.status(404);
            res.send(err)
        });
});
/**
 * @swagger
 * /warehouses/{id}:
 *  get:
 *      tags:
 *      - warehouses
 *      summary: get warehouse by id
 *      parameters:
 *          - in: path
 *            name: id
 *          - in: header
 *            name: x-access-token
 *            schema:
 *              type: string
 *            required: true
 *      description: get all warehouses if there is a token no matter the role
 *      responses:
 *          201:
 *              description: ok
 *
 */
warehousesRouter.get('/:id', validateToken, (req, res) =>{
    warehouseController.findWarehouseById(req.params.id).then(warehouse => {
        res.send(warehouse);
    }).catch((err)=>{
        res.status(404);
        res.send(err)
    });
});
/**
 * @swagger
 * /warehouses/{warehouseid}:
 *  get:
 *      tags:
 *      - warehouses
 *      summary: get warehouse by warehouseid
 *      parameters:
 *          - in: path
 *            name: id
 *          - in: header
 *            name: x-access-token
 *            schema:
 *              type: string
 *            required: true
 *      description: get all warehouses if there is a token no matter the role
 *      responses:
 *          201:
 *              description: ok
 *
 */
warehousesRouter.get('/:warehouseid', validateToken, (req, res) =>{
    warehouseController.getAllChemicals_byWarehouseId(req.params.id).then(warehouse => {
        res.send(warehouse);
    }).catch((err)=>{
        res.status(404);
        res.send(err)
    });
});
/**
 * @swagger
 * /warehouses/add:
 *  post:
 *      tags:
 *      - warehouses
 *      summary: add a new warehouse to the system
 *      parameters:
 *          - in: header
 *            name: x-access-token
 *          - in: body
 *            name: warehouse
 *            schema:
 *              $ref: '#/definitions/Warehouses'
 *      description: add a new warehouse to the system only for admin user (this isn't a often feature!!!)
 *      responses:
 *          201:
 *              description: ok
 *
 */
warehousesRouter.post('/add', validateToken, (req, res) =>{
    if(req.body.decoded.role === 'admin'){
        warehouseController.addNewWarehouse(req.body).then(warehouses => {
            res.send(warehouses);
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
 * /warehouses/chemicals/{warehouseid}:
 *  get:
 *      tags:
 *      - warehouses&chemicals
 *      summary: get chemicals from one warehouse
 *      parameters:
 *          - in: path
 *            name: warehouseid
 *          - in: header
 *            name: x-access-token
 *            schema:
 *              type: string
 *            required: true
 *      description: get all chemicals that are currently in a warehouse based on the id of teh warehouse
 *      responses:
 *          201:
 *              description: ok
 *
 */
warehousesRouter.get('/chemicals/:warehouseid', (req, res) =>{
    warehouses_chemicalsController.getAllChemicals_byWarehouseId(req.params.warehouseid).then(chemical => {
        res.send(chemical);
    }).catch((err)=>{
        res.status(404);
        res.send(err)
    });
});


export default warehousesRouter;