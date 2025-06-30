import {
  CreateCategories,
  DeleteItemCategory,
  GetAllCategories,
  GetItemCategory,
  UpdateItemCategory,
} from "../controllers/category.controller.js";

const categoriesRouter = (main, route) => {
  route.post("/create-category", CreateCategories);
  route.put("/update-item-category/:id", UpdateItemCategory);
  route.delete("/delete-item-category/:id", DeleteItemCategory);

  route.get("/get-all-categories", GetAllCategories);
  route.get("/get-item-category/:id", GetItemCategory);

  main.use("/api/v1/categories", route);
};

export default categoriesRouter;
