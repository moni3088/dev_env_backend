import jobsModel from '../models/jobs.model';
import  jobHistoryController from './jobhistories.controller';

/**
 * We need to add a new job, get all jobs, get one job by: id, warehouseid, chemicalid, special status
 * Will not delete or edit jobs.
 */
class JobsController{

    constructor(){
        this.jobsModel = jobsModel.getJobsModel();
    }
    addNewJob(data, decoded){
        let obj = new this.jobsModel(data.job);
        return new Promise((resolve, reject) => {
            obj.save().then(job => {
                //add job history
                let jobHistoryObj = {
                    jobid: job.id,
                    email: decoded.email,
                    jobstatus: data.status
                };
                console.log('Adding job backend ', jobHistoryObj);
                jobHistoryController.addJobHistory(jobHistoryObj).then( done => {
                    resolve(done);
                }, err => {
                    reject(err);
                })
            },err => {
                reject(err);
            });
        });

    }
    getAllJobs(){
        return this.jobsModel.all();
    }
    getJob_byJobId(id){
        return this.jobsModel.findAll({ where : {'id': id }})
    }
    getJob_byChemicalId(chemicalId){
        return this.jobsModel.findAll({ where : {'chemicalid': chemicalId }})
    }
    getJob_byWarehouseId(warehouseId){
        return this.jobsModel.findAll({ where : {'warehouseid': warehouseId }})
    }
    getJob_bySpecialStatus(specialStatus){
        return this.jobsModel.findAll({ where : {'special_status': specialStatus }})
    }


}
const jobsController = new JobsController();
export default jobsController;
