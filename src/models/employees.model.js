import db from '../../database/databaseConnection';
import Sequelize from 'sequelize';

class EmployeesModel{

    constructor(){
        this.sequalize = db.get_postgresDb_connection();
        this.defineModel();
        this.employeesModel.findAll();
    }
    defineModel(){
        //define user model
        this.employeesModel = this.sequalize.define('employees', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey:true
            },
            firstname: {
                type: Sequelize.STRING
            },
            lastname:{
              type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING
            },
            role: {
                type: Sequelize.STRING
            },
            password:{
                type: Sequelize.STRING
            }

        }, {timestamps:false, createdAt:false,  updatedAt: false});
    }
    getModel(){
        return this.employeesModel;
    }
}
const employeesModel = new EmployeesModel();
export default employeesModel;