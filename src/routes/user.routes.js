import {Router} from 'express';
import register from '../controllers/user.controllers.js';
import {upload} from '../middlewares/multer.middleware.js'


const userRoutes = Router();

userRoutes.route('/register').post(
    upload.fields([{
        name:"avatar",
        maxCount:1,

    },{
        name:"coverimage",
        maxCount:1,
    }]),
    
    
    register).get((req,res)=>res.end(console.log("heelo")))
export {userRoutes};