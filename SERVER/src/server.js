import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectionDB from "./config/db.js";
import routes from "./routers/router.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const main = express();
const port = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
main.use(express.static(path.join(__dirname, "public")));
// middleware
main.use(express.urlencoded({ extended: true }));
main.use(express.json());
main.use(
  cors({
    origin: [
      "http://localhost:5175",
      "http://localhost:5174",
      "http://localhost:5173",
    ], // Đổi thành domain frontend
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true, // Cho phép gửi cookies
  })
);

// connection to database
connectionDB();

// routes
routes(main);

main.listen(port, () => {
  console.log(`Server running to port: `, port);
});
