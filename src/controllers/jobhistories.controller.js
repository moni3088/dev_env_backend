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
        let obsToSave = {
                jobid: jobHistory.jobid,
                email: jobHistory.email,
                datetime: new Date(),
                jobstatus: jobHistory.status
        };
        let obj = new this.jobhistoriesModel(obsToSave);
        return obj.save();
    }
}
const jobHistoriesController = new JobHistoriesController();
export default jobHistoriesController;
