import express from 'express';
import employeesController from '../../controllers/employees.controller';
import jwt from 'jsonwebtoken';
import {getDecodedUserFromToken, validateToken} from '../middleware';
/**
 * @swagger
 * definitions:
 *  LogInUser:
 *      type: object
 *      required:
 *      - email
 *      - password
 *      properties:
 *          email:
 *              type: string
 *          password:
 *              type: string
 *
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
 * /employees/getEmployee:
 *  get:
 *      tags:
 *      - employees
 *      summary: get employee data based on token
 *      parameters:
 *          - in: header
 *            name: x-access-token
 *            schema:
 *              type: string
 *            required: true
 *      description: get employee data based on employee token
 *      responses:
 *          201:
 *              description: ok
 *
 */
employeesRouter.get('/getEmployee', (req, res) =>{ //needs token
    employeesController.getUserByEmailInToken(req).then(response =>{
        res.send(response);
    }, error =>{
        res.status(404).send(error);
    }).catch((err)=>{
        console.log(err);
        res.status(404);
        res.send(err)
    });
});


/**
 * @swagger
 * /employees/signup:
 *  post:
 *      tags:
 *      - employees
 *      summary: add employee account
 *      parameters:
 *          - in: header
 *            name: x-access-token
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
employeesRouter.post('/signup', validateToken, (req, res) =>{
    // check if decode request is strict as employee.role as admin
    // because at signup we make token out of retrieved employee
   if(req.decoded.employee.role === 'admin'){
       employeesController.addNewEmployee(req.body).then(employee =>{
           res.send(employee);
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
 * /employees/login:
 *  post:
 *      tags:
 *      - employees
 *      summary: login user to account
 *      parameters:
 *          - in: body
 *            name: employee
 *            schema:
 *              $ref: '#/definitions/LogInUser'
 *      description: login employee into account
 *      responses:
 *          201:
 *              description: ok
 *
 */
employeesRouter.post('/login', (req, res) =>{
    console.log('user ',req.body);
    employeesController.loginUser(req.body).then(response =>{
        res.send(response);
    }, error =>{
        res.status(404).send(error);
    }).catch((err)=>{
        console.log(err);
        res.status(404);
        res.send(err)
    });
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
 *      description: get all users if admin requests it
 *      responses:
 *          201:
 *              description: ok
 *
 */
employeesRouter.get('/all', validateToken, (req, res) =>{ //needs token
    if(req.decoded.employee.role === 'admin'){
        employeesController.getAllEmployees().then(users =>{
            res.send(users);
        }).catch((err)=>{
            res.status(404);
            res.send(err)
        });
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