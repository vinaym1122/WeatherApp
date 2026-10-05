import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const DBURL = process.env.DBURL || "mongodb://localhost:27017/weatherApp";

let db;

export async function connectDB()
{
if(!db){
    db = await mongoose.connect(DBURL);
}
return db;
}