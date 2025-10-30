

import express from 'express';
import authUser from '../middlewares/authUser.js';
import { getAllOrders, getSellerOrders, getUserOrders, placeOrderCOD, placeOrderStripe } from '../controllers/orderController.js';
import authSeller from '../middlewares/authSeller.js';


const orderRouter = express.Router();

orderRouter.post('/cod', authUser, placeOrderCOD)
orderRouter.get('/user', authUser, getUserOrders)
// orderRouter.get('/seller', authSeller, getAllOrders)
orderRouter.get('/seller', authSeller, getSellerOrders);
orderRouter.get('/all', getAllOrders);
// routes/orderRoutes.js

orderRouter.post('/stripe', authUser, placeOrderStripe);



export default orderRouter

