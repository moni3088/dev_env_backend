import chemicalsModel from '../models/chemicals.model';


/**
 * There are three types of chemicals : A, B, C which can be added to the type
 * There are multiple id's but three types of chemicals
 * Quantity is an attribute of the chemical same as type.
 * We need Create and Read - add chemical, get all and get by id.
 */
class ChemicalsController{

    constructor(){
        this.chemicalsModel = chemicalsModel.getModel();
    }
    getAllChemicals(){
        return this.chemicalsModel.all();
    }

}
const chemicalsController = new ChemicalsController();
export default chemicalsController;
