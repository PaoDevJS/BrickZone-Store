import {
  createAddress,
  deleteAddress,
  getAllAddress,
  getItemAddress,
  updateAddress,
} from "../controllers/address.controller.js";
import { verifyTokenOfUser } from "../middlewares/verifyToken.js";

const addressRouter = (main, route) => {
  route.post("/create-address", verifyTokenOfUser, createAddress);
  route.put("/update-item-address/:id", verifyTokenOfUser, updateAddress);
  route.delete("/delete-item-address/:id", verifyTokenOfUser, deleteAddress);
  route.get("/get-all-address", verifyTokenOfUser, getAllAddress);
  route.get("/get-item-address/:id", verifyTokenOfUser, getItemAddress);

  main.use("/api/v1/address", route);
};

export default addressRouter;
