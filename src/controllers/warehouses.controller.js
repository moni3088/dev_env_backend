import warehouseModel from '../models/warehouses.model';


/**
 * No need to add a new warehouse through API in db - all warehouses are from 1 to 5 (those are the ids too)
 * Just get all warehouses
 * get one warehouse
 * update chemical id and max storage
 */
class WarehouseController{
    constructor(){
        this.warehouseModel = warehouseModel.getModel();
    }
    getAllWarehouses(){
        return this.warehouseModel.all();
    }
}
const warehouseController = new WarehouseController();
export default warehouseController;
