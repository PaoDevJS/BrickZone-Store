import {
  CreateSupplier,
  deleteItemSupplier,
  GetAllSuppliers,
  GetItemSupplier,
  updateItemSupplier,
} from "../controllers/supplier.controller.js";
import { upload } from "../utils/multer.js";

const supplierRouter = async (main, route) => {
  route.post("/create-supplier", upload.single("imgUrl"), CreateSupplier);
  route.put(
    "/update-item-supplier/:id",
    upload.single("imgUrl"),
    updateItemSupplier
  );
  route.delete("/delete-item-supplier/:id", deleteItemSupplier);

  route.get("/get-item-supplier/:id", GetItemSupplier);
  route.get("/get-all-suppliers", GetAllSuppliers);

  main.use("/api/v1/supplier", route);
};

export default supplierRouter;
