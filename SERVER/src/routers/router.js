import express from "express";
import authRouter from "./auth.router.js";
import categoriesRouter from "./category.router.js";
import supplierRouter from "./supplier.router.js";
import productRouter from "./product.router.js";
import blogRouter from "./blog.router.js";
import userRouter from "./user.router.js";
import cartRoute from "./cart.route.js";
import orderRouter from "./order.router.js";
import addressRouter from "./address.router.js";

const route = express.Router();

const routes = (main) => {
  authRouter(main, route);
  supplierRouter(main, route);
  categoriesRouter(main, route);
  productRouter(main, route);
  blogRouter(main, route);
  userRouter(main, route);
  cartRoute(main, route)
  orderRouter(main, route)
  addressRouter(main, route)
};

export default routes;
