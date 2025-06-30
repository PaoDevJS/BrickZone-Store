import {
  createOrderPayment,
  getAllOrders,
  getAllOrdersOfUser,
  getItemOrder,
  updateItemOrder,
} from "../controllers/order.controller.js";
import { verifyTokenOfUser } from "../middlewares/verifyToken.js";
import { checkTypePaymentMoMo } from "../services/payment_momo.js";

const orderRouter = (main, route) => {
  route.post(
    "/payment/create-order-payment",
    verifyTokenOfUser,
    createOrderPayment
  );

  route.post("/payment/check-type-payment/:id", checkTypePaymentMoMo);

  route.put("/update-item-order/:id", updateItemOrder);
  route.get("/get-all-orders", getAllOrders);
  route.get("/get-all-orders-of-user", verifyTokenOfUser, getAllOrdersOfUser);
  route.get("/get-item-order/:id", getItemOrder);

  main.use("/api/v1/order", route);
};

export default orderRouter;
