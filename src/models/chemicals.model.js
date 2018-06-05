import db from '../../database/databaseConnection';
import Sequelize from 'sequelize';

class ChemicalsModel{

    constructor(){
        this.sequalize = db.get_postgresDb_connection();
        this.defineModel();
        this.chemicalsModel.findAll();
    }
    defineModel(){
        //define user model
        this.chemicalsModel = this.sequalize.define('chemicals', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey:true
            },
            type: {
                type: Sequelize.STRING
            },
            quantity:{
                type: Sequelize.STRING
            }
        }, {timestamps:false, createdAt:false,  updatedAt: false});
    }
    getModel(){
        return this.chemicalsModel;
    }
}
const chemicalsModel = new ChemicalsModel();
export default chemicalsModel;