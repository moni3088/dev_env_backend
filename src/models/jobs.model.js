import db from '../../database/databaseConnection';
import Sequelize from 'sequelize';

class JobsModel{

    constructor(){
        this.sequalize = db.get_postgresDb_connection();
        this.defineModel();
        this.jobsModel.findAll();
    }
    defineModel(){
        //define user model
        this.jobsModel = this.sequalize.define('jobs', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey:true
            },
            chemicalid: {
                type: Sequelize.STRING
            },
            warehouseid: {
                type: Sequelize.STRING
            },
            special_status: {
                type: Sequelize.STRING
            },

        }, {timestamps:false, createdAt:false,  updatedAt: false});
    }
    getModel(){
        return this.jobsModel;
    }
}
const jobsModel = new JobsModel();
export default jobsModel;