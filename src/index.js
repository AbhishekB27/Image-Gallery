import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router1 from "./routes/authRoute";
import { connectDB } from "./Services/mongodb/connectDB";
import router3 from "./routes/imageRoute";
import router2 from "./routes/categoryRoute";
import router4 from "./routes/reviewRoute";

dotenv.config("../.env"); //it loads the .env file into the process (environment variables)
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json()); // body parser middleware
app.use(cors());
connectDB()

app.use("/api/v1/auth", router1);
app.use("/api/v1/category", router2);
app.use("/api/v1/images", router3);
app.use("/api/v1/reviews", router4);


app.get('/',(req,res)=>{
    res.send('Hello Abhishek! V2')
})
app.get('/auth',(req,res)=>{
    res.send('Hello I Am Backend! V2')
})

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
