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
                console.log('here')
                //add job history
                const jobHistoryObj = {
                    jobid: job.id,
                    email: decoded.email,
                    datetime: new Date(),
                    jobstatus: data.status
                };
                jobHistoryController.addJobHistory(jobHistoryObj).then( done => {
                    resolve(done);
                }, err => {
                    reject(err);
                })
            },err => {
                reject(err);
            }).catch((err)=>{
                reject(err);
            });
        });

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
    editExistingJob_byId(jobid){

    }

}
const jobsController = new JobsController();
export default jobsController;
