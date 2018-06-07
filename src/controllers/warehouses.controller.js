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
    findWarehouseById(id){
        return this.warehouseModel.findOne({ where : {'id': id }})
    }
    addNewWarehouse(newWarehouse){
        return new Promise ((resolve, reject) => {
            // check if this warehouse already exists
            if(this.findWarehouseById(newWarehouse.id)){
                reject(true);
            }else{
                let warehouseObj = new this.warehouseModel(newWarehouse);
                warehouseObj.save();
                resolve(true);
            }
        })
    }
}
const warehouseController = new WarehouseController();
export default warehouseController;
