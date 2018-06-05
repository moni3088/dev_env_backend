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
}
const jobHistoriesController = new JobHistoriesController();
export default jobHistoriesController;
