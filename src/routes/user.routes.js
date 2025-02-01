import {Router} from 'express';
import register from '../controllers/user.controllers.js';


const userRoutes = Router();

userRoutes.route('/register').post(register);
export {userRoutes};