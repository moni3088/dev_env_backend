import express from 'express';
import fs from 'fs';

let imageRouter = express.Router();

imageRouter.get('/', (req, res)=>{
    fs.readdir('./dist/assets/images/event', function (err, files) {
        if(err)
            console.log(err);
        console.log(files);
        res.send(files);
        // "files" is an Array with files names
    });
});


export default imageRouter;