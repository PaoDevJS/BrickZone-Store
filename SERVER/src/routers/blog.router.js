import { deleteItemBlog, getAllBlog, getItemBlog, newCreateBlog, updateItemBlog } from "../controllers/blog.controller.js";
import { upload } from "../utils/multer.js";

const blogRouter = (main, route) => {
    route.post('/create-blog', upload.single('imgBlog'), newCreateBlog)
    route.put('/update-item-blog/:id', upload.single('imgBlog'), updateItemBlog)
    route.delete('/delete-item-blog/:id', deleteItemBlog)

  route.get("/get-item-blog/:id", getItemBlog);
  route.get("/get-all-blog", getAllBlog);

  main.use("/api/v1/blog", route);
};

export default blogRouter;
