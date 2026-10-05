import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {connectDB} from "./db.js"
import userRouter from "./controllers/userController.js";
import roleRouter from "./controllers/roleController.js";
import weatherRouter from './controllers/weatherController.js'


const app = express();
app.use(express.json());

app.use(cors());

app.use(["/user", "/users"], userRouter);
app.use(["/role", "/roles"], roleRouter);
app.use("/weather", weatherRouter)

dotenv.config();
//Data Base Connection 
connectDB();

//Default URL
app.get("/", async(req, res) => {
  res.json({ message: "Server Started and MongoDB connected sucess..." });
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});