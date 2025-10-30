// import jwt from "jsonwebtoken";

// const authSeller = async(req, res, next)=>{
//     const {sellerToken} = req.cookies;
//     if(!sellerToken){
//         return res.status(401).json({message:"Unauthorized"});
//     }

//      try{
//         const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET);
//         if(tokenDecode.email === process.env.SELLER_EMAIL){
//              next(); //execute the controller function
        
//         }
//         else{
//             return res.status(401).json({message:"Unauthorized"});
//         }
       
//        } catch(error){
//    return res.status(401).json({success:false, message:error.message});
// }
//     }

// export default authSeller

// middlewares/authSeller.js
import jwt from 'jsonwebtoken';
import Seller from '../models/Seller.js';

const authSeller = async (req, res, next) => {
  try {
    const { sellerToken } = req.cookies;
    if (!sellerToken) return res.status(401).json({ success: false, message: 'Unauthorized' });

    const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);
    if (!decoded || !decoded.sellerId) return res.status(401).json({ success: false, message: 'Invalid token' });

    const seller = await Seller.findById(decoded.sellerId);
    if (!seller) return res.status(401).json({ success: false, message: 'Seller not found' });

    req.seller = seller;
    next();
  } catch (err) {
    console.error('authSeller error:', err);
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
};

export default authSeller;

