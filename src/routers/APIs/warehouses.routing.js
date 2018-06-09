import express from 'express';
import warehouseController from '../../controllers/warehouses.controller';
import  {validateToken}  from '../middleware';

/**
 * @swagger
 * definitions:
 *  Warehouses:
 *      type: object
 *      required:
 *      - id
 *      - chemicalid
 *      - maxstorage
 *      properties:
 *          id:
 *            type: integer
 *          chemicalid:
 *              type: integer
 *          maxstorage:
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
    if(req.decoded.employee.role === 'admin'){
        warehouseController.getAllWarehouses().then(warehouses => {
            res.send(warehouses);
        }).catch((err)=>{
            console.log(err);
            res.status(404);
            res.send('warehouses not retrieved')
        });
    }
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
    if(req.decoded.employee.role === 'admin'){
        console.log('Warehouse is: ', req.body);
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

export default warehousesRouter;