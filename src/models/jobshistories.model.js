import db from '../../database/databaseConnection';
import Sequelize from 'sequelize';

class JobHistoriesModel{

    constructor(){
        this.sequalize = db.get_postgresDb_connection();
        this.defineModel();
        this.jobHistoriesModel.findAll();
    }
    defineModel(){
        //define user model
        this.jobHistoriesModel = this.sequalize.define('jobhistories', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey:true
            },
            jobid: {
                type: Sequelize.STRING
            },
            status:{
                type: Sequelize.STRING
            },
            employeeid:{
                type: Sequelize.STRING
            }
        }, {timestamps:true, createdAt:false,  updatedAt: false});
    }
    getModel(){
        return this.jobHistoriesModel;
    }
}
const jobHistoriesModel = new JobHistoriesModel();
export default jobHistoriesModel;