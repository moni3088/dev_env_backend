import warehousesChemicalsModel from '../models/warehouses_chemicals.model';
import chemicalsModel from "../models/chemicals.model";
import _ from 'lodash';

class WarehouseController{
    constructor(){
        this.warehousesChemicalsModel = warehousesChemicalsModel.getModel();
        this.chemicalsModel = chemicalsModel.getChemicalsModel();
    }
    /**
     * Get all the data from the table
     * @returns {*}
     */
    getAllData(){
        return new Promise((resolve, reject)=>{
            this.warehousesChemicalsModel.findAll({include: [{model: this.chemicalsModel} ]}).then(data => {
                let map = data.map((obj) => {return obj.toJSON()})
                let groupWarehouses = _.groupBy(map, 'warehouseid');
                //loop through obj
                for(let prop in groupWarehouses) {
                    if (groupWarehouses.hasOwnProperty(prop)){
                        //loop through chemical
                        let takenSpace = 0;
                        for(let i in groupWarehouses[prop]){
                            takenSpace = takenSpace + groupWarehouses[prop][i].chemicalquantity;
                        }
                        groupWarehouses[prop].push({takenSpace: takenSpace});

                    }
                }
                console.log(groupWarehouses);
                resolve(groupWarehouses);

            }).catch((err)=>{
                reject(err);

            });
        });

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
        let obj = new this.warehousesChemicalsModel(data);
        return obj.save();
    }
    updateInventory(data){
        return this.warehousesChemicalsModel.update({
            chemicalquantity: data.chemicalquantity,
        }, {
            where: {
                warehouseid: data.warehouseid,
                chemicalid: data.chemicalid
            }
        });
    }
    deleteInventory_byId(dataid){
        return this.warehousesChemicalsModel.destroy({where:{'id':dataid}});
    }
    deleteInventory_byChemicalWarehouseIds(dataids){
        return this.warehousesChemicalsModel.destroy({where:{'chemicalid':dataids.chemicalid, 'warehouseid':dataids.warehouseid}});
    }
}
const warehouseController = new WarehouseController();
export default warehouseController;
