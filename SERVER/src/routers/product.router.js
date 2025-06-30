import {
  deleteItemProduct,
  getAllProduct,
  getItemProduct,
  newCreateProduct,
  updateItemProduct,
} from "../controllers/product.controller.js";
import { upload } from "../utils/multer.js";

const productRouter = (main, route) => {
  route.post(
    "/create-product-new",
    upload.array("imgUrls", 15),
    newCreateProduct
  );
  route.put(
    "/update-item-product/:id",
    upload.array("imgUrls", 15),
    updateItemProduct
  );
  route.delete("/delete-item-product/:id", deleteItemProduct);

  route.get("/get-item-product/:id", getItemProduct);
  route.get("/get-all-product", getAllProduct);

  main.use("/api/v1/product", route);
};

export default productRouter;
