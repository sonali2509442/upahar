import express from 'express';
import { isauth,  login, logout, register } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';

const userRoute = express.Router();

userRoute.post('/register',register)
userRoute.post('/login',login)
userRoute.get('/is-auth',authUser,isauth)
userRoute.get('/logout',authUser,logout)




export default userRoute