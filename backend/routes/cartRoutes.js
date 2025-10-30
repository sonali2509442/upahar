
// import express from "express";
// import authUser from "../middlewares/authUser.js";
// import { updateCart } from "../controllers/cartController.js";

// const cartRouter = express.Router();

// cartRouter.post('/update', authUser, updateCart)

// export default  cartRouter

import express from "express";
import { updateCart } from "../controllers/cartController.js";
import authUser from "../middlewares/authUser.js";

const cartRouter = express.Router();

cartRouter.post("/update", authUser, updateCart);

export default cartRouter;
