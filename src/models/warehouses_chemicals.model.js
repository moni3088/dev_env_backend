import db from '../../database/databaseConnection';
import Sequelize from 'sequelize';
import chemicalsModel from "./chemicals.model";

class WarehousesChemicalsModel{

    constructor(){
        this.chemicalsModel = chemicalsModel.getChemicalsModel();
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
        this.warehouses_chemicalsModel.belongsTo(this.chemicalsModel, {foreignKey: 'chemicalid'})
    }
    getModel(){
        return this.warehouses_chemicalsModel;
    }
}
const warehousesChemicalsModel = new WarehousesChemicalsModel();
export default warehousesChemicalsModel;