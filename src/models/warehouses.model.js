import db from '../../database/databaseConnection';
import Sequelize from 'sequelize';

class WarehousesModel{

    constructor(){
        this.sequalize = db.get_postgresDb_connection();
        this.defineModel();
        this.warehousesModel.findAll();
    }
    defineModel(){
        //define user model
        this.warehousesModel = this.sequalize.define('warehouses', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey:true
            },
            chemicalid: {
                type: Sequelize.STRING
            },
            maxstorage:{
                type: Sequelize.STRING
            }
        }, {timestamps:false, createdAt:false,  updatedAt: false});
    }
    getModel(){
        return this.warehousesModel;
    }
}
const warehousesModel = new WarehousesModel();
export default warehousesModel;