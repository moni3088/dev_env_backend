import employeeModel from '../models/employees.model';
import jwt from 'jsonwebtoken';

/**
 * Need to add a new employee only with admin privilege
 * Need to read all emplyees only admin privilege
 * Need to get employee by id admin privilege
 * Delete employees dev privilege.
 */
class EmployeeController{

    constructor(){
        this.employeeModel = employeeModel.getModel();
    }

    addNewEmployee(employee){
        let employeeObj = new this.employeeModel(employee);
        return employeeObj.save();
    }
    getEmployeesByEmail(employee){
        return new Promise((resolve, reject)=>{
            this.findEmployee_byEmail(employee.email).then((employee_from_db)=>{
                if(employee_from_db){
                    resolve(employee_from_db);
                }else{
                    reject();
                }
            })
        });
    }
    getEmployeesById(employee){
        return new Promise((resolve, reject)=>{
            this.findEmployee_byId(employee.email).then((employee_from_db)=>{
                if(employee_from_db){
                    resolve(employee_from_db);
                }else{
                    reject();
                }
            })
        });
    }
    deleteEmployeeByEmail(email){
        return this.findEmployee_byEmail(email).then(employee => {
            return employee.destroy();
        })
    }
    deleteEmployeeById(employeeId){
        return this.findEmployee_byEmail(employeeId).then(employee => {
            return employee.destroy();
        })
    }
    loginUser(userData){
        // return a newly created promise
        return new Promise((resolve, reject)=>{
            // check if there is user data which is not null or empty string
            if(userData.email && userData.password){
                // call on function which returns employee if it finds it
                this.findEmployee_byEmail(userData.email).then(retrievedEmployeeData =>{
                    if(retrievedEmployeeData){
                        // check for password match
                        jwt.sign({employee: retrievedEmployeeData}, 'WhoMovedMyKeys', (error, token) =>{
                            let response = {
                                token: token,
                                employee: retrievedEmployeeData
                            };
                            resolve(response);
                        });
                    }else{
                        reject('No user');
                    }
                }, error => {
                    reject(error)
                }).catch((err)=>{
                    reject(err); // like timeout error or lost conn to db
                })
            }else{
                reject();
            }
        });
    }

    hashPassword(password){
        // needs to have smthg else than just bcrypt because bcrypt is deprecated
        return bcrypt.hash(password, 5);
    }
    getAllEmployees(){
        return this.employeeModel.all();
    }
    findEmployee_byEmail(email){
        return this.employeeModel.findOne({ where : {'email': email }})
    }
    findEmployee_byId(employeeId){
        return this.employeeModel.findOne({ where : {'employeeid': employeeId }})
    }
}
const employeeController = new EmployeeController();
export default employeeController;
