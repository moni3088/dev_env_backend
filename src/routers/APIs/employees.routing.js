import express from 'express';
import employeesController from '../../controllers/employees.controller';
import jwt from 'jsonwebtoken';
import  {validateToken}  from '../middleware';
/**
 * @swagger
 * definitions:
 *  Employees:
 *      type: object
 *      required:
 *      - email
 *      properties:
 *          firstname:
 *              type: string
 *          lastname:
 *              type: string
 *          email:
 *              type: string
 *          password:
 *              type: string
 *          role:
 *              type: string
 *
 */
let employeesRouter = express.Router();

/**
 * @swagger
 * /employees/signup:
 *  post:
 *      tags:
 *      - employees
 *      summary: add employee account
 *      parameters:
 *          - in: body
 *            name: employee
 *            schema:
 *              $ref: '#/definitions/Employees'
 *      description: add employee account to database
 *      responses:
 *          201:
 *              description: ok
 *
 */
employeesRouter.post('/signup', (req, res) =>{ //needs token
    console.log('Employee is: ', req.body);
    employeesController.addNewEmployee(req.body).then(employee =>{
        res.send(employee);
    })

});



/**
 * @swagger
 * /employees/all:
 *  get:
 *      tags:
 *      - employees
 *      summary: get all employees
 *      parameters:
 *          - in: header
 *            name: x-access-token
 *            schema:
 *              type: string
 *            required: true
 *      description: get all users
 *      responses:
 *          201:
 *              description: ok
 *
 */
employeesRouter.get('/all', (req, res) =>{ //needs token
    if(req.decoded.admin){
        employeesController.getAllEmployees().then(users =>{
            res.send(users);
        })
    }else{
        res.status(401);
        res.send('you are not an admin');
    }

});


/*
/!**
 * @swagger
 * /employees/{userId}:
 *  get:
 *      tags:
 *      - employees
 *      summary: get one user by id
 *      description: get one user from db based on userId
 *      parameters:
 *      - in: header
 *        name: x-access-token
 *        required: true
 *      - in: path
 *        name: userId
 *        required: true
 *        schema:
 *          type: number
 *      responses:
 *          200:
 *              description: ok
 *
 *!/

employeesRouter.get('/getById/:userId',validateToken, (req, res)=>{
    employeesController.getEmployeesById(req.params.userId).then((user)=>{
        res.send(user);
    }).catch(()=>{
        res.status(404);
        res.send('not found')
    });
});

/!**
 * @swagger
 * /employees/user:
 *  post:
 *      tags:
 *      - user
 *      summary: add user
 *      description: add user
 *      parameters:
 *      - in: body
 *        name: user
 *        schema:
 *           $ref: '#/definitions/User'
 *      responses:
 *          201:
 *              description: ok
 *
 *!/
employeesRouter.post('/user', (req, res)=>{
    const userObject = {
        email: req.body.email,
        password: req.body.password
    };
    employeesController.addUser(req.body).then((response)=>{
        employeesController.authenticate(userObject).then(user => {
            console.log('this is user after auth');
            const payload = {
                admin: user.isAdmin,
                email: user.email
            };
            let token = jwt.sign(payload, 'superDuperSecretKey',  { expiresIn: '1h' });
            res.json({
                token : token
            });
        }).catch((err)=>{
            console.log(err, ' HERE HERE');
            res.status(404);
            res.send('not found')
        });

    }).catch((err)=>{
        res.status(409);
        res.send(err);
    });
});


/!**
 * @swagger
 * /employees/user/{email}/:
 *  get:
 *     tags:
 *      - user
 *     summary: get user
 *     description: get a particular matching users
 *     consumes: application/json
 *     parameters:
 *      - in: header
 *        name: x-access-token
 *        schema:
 *          type: string
 *      - in: path
 *        name: email
 *        schema:
 *          type: string
 *     responses:
 *          201:
 *              description: ok
 *!/
employeesRouter.get('/user/:email/',validateToken, (req, res)=>{
    let obj = {
        email: req.params.email,
    };
    employeesController.getUser(obj).then((user)=>{
        if(req.decoded.email === obj.email || req.decoded.admin){
            res.send(user);
        }else{
            res.status(401);
            res.send('You are not authorized')
        }
    }).catch(()=>{
        res.status(404);
        res.send('not found')
    })
});

/!**
 * @swagger
 * /employees/user/{email}/:
 *  delete:
 *      tags:
 *      - user
 *      summary: delete user
 *      description: delete user
 *      parameters:
 *      - in: header
 *        name: x-access-token
 *        schema:
 *          type: string
 *      - in: path
 *        name: email
 *        schema:
 *      responses:
 *          201:
 *              description: ok
 *!/
employeesRouter.delete('/user/:email/', validateToken, (req, res)=>{
    let email =  req.params.email;
    if(req.decoded.admin || req.decoded.email === email){
        employeesController.deleteUser(email).then(response => {
            res.send(response)
        })
    }else{
        res.status(401);
        res.send('You are not authorized');
    }
});

/!**
 * @swagger
 * /employees/user/{email}/:
 *  put:
 *      tags:
 *      - user
 *      summary: update user
 *      description: update user
 *      parameters:
 *      - in: header
 *        name: x-access-token
 *        schema:
 *          type: string
 *      - in: path
 *        name: email
 *        schema:
 *      - in: body
 *        name: user
 *        schema:
 *           $ref: '#/definitions/User'
 *      responses:
 *          201:
 *              description: ok
 *!/
employeesRouter.put('/user/:email/', validateToken, (req, res)=>{
    let email =  req.params.email;
    if(req.decoded.admin || req.decoded.email === email){
        employeesController.updateUser(email, req.body).then(response => {
            res.send(response)
        })
    }else{
        res.status(401);
        res.send('You are not authorized');
    }
});
*/

export default employeesRouter;