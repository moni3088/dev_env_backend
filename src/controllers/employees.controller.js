import employeeModel from '../models/employees.model';

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
        /*return this.hashPassword(employee.password).then((hashed)=>{
            employee.password = hashed;
            let employeeObj = new this.employeeModel(employee);
            return employeeObj.save();
        });*/
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
