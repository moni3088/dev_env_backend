import jobsModel from '../models/jobs.model';


/**
 * We need to add a new job, get all jobs, get one job by: id, warehouseid, chemicalid, special status
 * Will not delete or edit jobs.
 */
class JobsController{

    constructor(){
        this.jobsModel = jobsModel.getModel();
    }
    addNewJob(job){

    }
    getAllJobs(){
        return this.jobsModel.all();
    }
    getAllJobs_byJobId(jobId){
        return this.jobsModel.findOne({ where : {'jobid': jobId }})
    }
    getAllJobs_byChemicalId(chemicalId){
        return this.jobsModel.findOne({ where : {'chemicalid': chemicalId }})
    }
    getAllJobs_byWarehouseId(warehouseId){
        return this.jobsModel.findOne({ where : {'warehouseid': warehouseId }})
    }
    getAllJobs_bySpecialStatus(specialStatus){
        return this.jobsModel.findOne({ where : {'special_status': specialStatus }})
    }


}
const jobsController = new JobsController();
export default jobsController;
