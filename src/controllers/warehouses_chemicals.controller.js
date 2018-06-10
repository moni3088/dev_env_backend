import warehousesChemicalsModel from '../models/warehouses_chemicals.model';

class WarehouseController{
    constructor(){
        this.warehousesChemicalsModel = warehousesChemicalsModel.getModel();
    }

    /**
     * Get all the data from the table
     * @returns {*}
     */
    getAllData(){
        return this.warehousesChemicalsModel.all();
    }

    /**
     * Retrieve all the chemicals where the warehouse with id x exists
     * @param warehouseid
     * @returns {Promise<warehouses_chemicals>}
     */
    getAllChemicals_byWarehouseId(warehouseid){
        return this.warehousesChemicalsModel.findAll({where:{'warehouseid': warehouseid}})
    }

    /**
     * Retrieve all the warehouses where the chemical with id x exists
     * @param chemicalid
     * @returns {Promise<warehouses_chemicals>}
     */
    getAllWarehouses_byChemicalId(chemicalid){
        return this.warehousesChemicalsModel.findAll({where:{'chemicalid': chemicalid}});
    }

    /**
     * Add new row data in this table
     * @param data
     * @returns {*}
     */
    addDataToWarehouseAndChemicals(data){
        // TO DO: check if this combo exists already get where value and value, if not then continue.
        let obj = new this.warehousesChemicalsModel(data);
        return obj.save();
    }
}
const warehouseController = new WarehouseController();
export default warehouseController;
