import express from 'express';
import  chemicalsController from '../../controllers/chemicals.controller';
/**
 * @swagger
 * definitions:
 *  Chemicals:
 *      type: object
 *      required:
 *      - type
 *      - quantity
 *      properties:
 *          id:
 *              type: string
 *          type:
 *              type: string
 *          quantity:
 *              type: string
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
chemicalsRouter.get('/all', (req, res) =>{  //needs token
});

export default chemicalsRouter;