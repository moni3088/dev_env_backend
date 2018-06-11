import warehouseModel from '../models/warehouses.model';
import warehousesChemicalsModel from '../models/warehouses_chemicals.model';


/**
 * No need to add a new warehouse through API in db - all warehouses are from 1 to 5 (those are the ids too)
 * Just get all warehouses
 * get one warehouse
 * update chemical id and max storage
 */
class WarehouseController{
    constructor(){
        this.warehouseModel = warehouseModel.getModel();
        this.warehousesChemicalsModel = warehousesChemicalsModel.getModel();
    }
    getAllWarehouses(){
        return this.warehouseModel.all();
    }
    findWarehouseById(warehouseid){
        return this.warehouseModel.findAll({ where : {'id': warehouseid }})
    }
    addNewWarehouse(newWarehouse){
        let warehouseObj = new this.warehouseModel(newWarehouse);
        return warehouseObj.save();
    }

}
const warehouseController = new WarehouseController();
export default warehouseController;
