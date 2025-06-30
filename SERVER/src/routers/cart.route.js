import {
  addProductItemOnCart,
  deleteProductItemToCart,
  getAllProductsInCart,
  updateProductItemToCart,
} from "../controllers/cart.controller.js";
import { verifyTokenOfUser } from "../middlewares/verifyToken.js";

const cartRoute = (main, route) => {
  route.post("/product-add-to-cart", verifyTokenOfUser, addProductItemOnCart);
  route.get("/get-all-product-cart", verifyTokenOfUser, getAllProductsInCart);
  route.put(
    "/update-product-item-to-cart/:id",
    verifyTokenOfUser,
    updateProductItemToCart
  );
  route.delete(
    "/delete-product-item-to-cart/:id",
    verifyTokenOfUser,
    deleteProductItemToCart
  );

  main.use("/api/v1/cart", route);
};

export default cartRoute;
