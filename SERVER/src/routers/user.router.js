import { GetAllUsers, GetItemUser, isChangePassword, isCheckEmailOfUser, isCheckOtpOfUser, isRestPassword } from "../controllers/user.controller.js";
import { verifyTokenOfUser } from "../middlewares/verifyToken.js";

const userRouter = (main, route) => {
  route.get("/get-item-user/:id", verifyTokenOfUser, GetItemUser);
  route.get("/get-all-users", GetAllUsers);
  route.post("/change-password", verifyTokenOfUser, isChangePassword);
  route.post("/send-email", isCheckEmailOfUser);
  route.post("/check-otp", isCheckOtpOfUser);
  route.post("/rest-password", isRestPassword);

  main.use("/api/v1/user", route);
};

export default userRouter;
