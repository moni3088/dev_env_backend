import warehousesChemicalsModel from '../models/warehouses_chemicals.model';

class WarehouseController{
    constructor(){
        this.warehousesChemicalsModel = warehousesChemicalsModel.getModel();
    }

    /**
     * Retrieve all the chemicals where the warehouse with id x exists
     * @param warehouseid
     * @returns {Promise<Model>}
     */
    getAllChemicals_byWarehouseId(warehouseid){
        return this.warehousesChemicalsModel.findOne({where:{'warehouseid': warehouseid}})
    }

    /**
     * Retrieve all the warehouses where the chemical with id x exists
     * @param chemicalid
     * @returns {Promise<warehouses_chemicals>}
     */
    getAllWarehouses_byChemicalId(chemicalid){
        return this.warehousesChemicalsModel.findOne({where:{'chemicalid': chemicalid}})
    }
}
const warehouseController = new WarehouseController();
export default warehouseController;
