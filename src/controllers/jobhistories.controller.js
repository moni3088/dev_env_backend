import jobhistoriesModel from '../models/jobshistories.model';

/**
 * Create a job history entry
 * Get a job history entry by: jobhistory id, jobid, timestamp, employeeid
 * Get all job history maybe
 */
class JobHistoriesController{
    constructor(){
        this.jobhistoriesModel = jobhistoriesModel.getModel();
    }
    getAll_jobHistories(){
        return this.jobhistoriesModel.all();
    }
    addJobHistory(jobHistory){
        let obj = new this.jobhistoriesModel(jobHistory);
        return obj.save();
    }
    updateJobHistoryStatus(data){
        return this.jobhistoriesModel.update({
            chemicalquantity: data.chemicalquantity,
        }, {
            where: {
                warehouseid: data.warehouseid,
                chemicalid: data.chemicalid
            }
        });
    }


}
const jobHistoriesController = new JobHistoriesController();
export default jobHistoriesController;
