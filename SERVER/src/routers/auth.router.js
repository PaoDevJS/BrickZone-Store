import {
  getItemAuth,
  SignIn,
  SignUp,
  updateItemAuth,
} from "../controllers/auth.controller.js";

const authRouter = (main, route) => {
  route.post("/create-auth", SignUp);
  route.post("/login-auth", SignIn);
  route.get("/get-item-auth/:id", getItemAuth);
  route.put("/update-item-auth/:id", updateItemAuth);

  main.use("/api/v1/auth", route);
};

export default authRouter;
