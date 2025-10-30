// import express from 'express';
// import {  isSellerauth, sellerLogin, sellerlogout } from '../controllers/sellerController.js';
// import authSeller from '../middlewares/authSeller.js';

// const sellerRoute = express.Router();


// sellerRoute.post('/login',sellerLogin);
// sellerRoute.get('/is-sauth',authSeller,isSellerauth);
// sellerRoute.get('/logout',sellerlogout)


// export default sellerRoute;


import express from 'express';
import { sellerRegister, sellerLogin, sellerlogout, isSellerauth } from '../controllers/sellerController.js';
import authSeller from '../middlewares/authSeller.js';

const sellerRoute = express.Router();

sellerRoute.post('/seller-register', sellerRegister);
sellerRoute.post('/login', sellerLogin);
sellerRoute.get('/logout', sellerlogout);
sellerRoute.get('/is-sauth', authSeller, isSellerauth);

export default sellerRoute;
