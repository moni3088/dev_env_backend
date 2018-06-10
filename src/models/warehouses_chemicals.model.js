import db from '../../database/databaseConnection';
import Sequelize from 'sequelize';

class WarehousesChemicalsModel{

    constructor(){
        this.sequalize = db.get_postgresDb_connection();
        this.defineModel();
        this.warehouses_chemicalsModel.findAll();
    }
    defineModel(){
        //define user model
        this.warehouses_chemicalsModel = this.sequalize.define('warehouses_chemicals', {
            warehouseid: {
                type: Sequelize.INTEGER
            },
            chemicalid:{
                type: Sequelize.INTEGER
            },
            chemicalquantity:{
                type: Sequelize.STRING
            }
        }, {timestamps:false, createdAt:false,  updatedAt: false});
    }
    getModel(){
        return this.warehouses_chemicalsModel;
    }
}
const warehousesChemicalsModel = new WarehousesChemicalsModel();
export default warehousesChemicalsModel;