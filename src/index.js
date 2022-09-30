import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/authRoute";
import { connectDB } from "./Services/mongodb/connectDB";

dotenv.config("../.env"); //it loads the .env file into the process (environment variables)
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json()); // body parser middleware
app.use(cors());
connectDB()

// app.use("/api/v1/auth", router);
app.get('/',(req,res)=>{
    res.send('Hello Abhishek! V2')
})
app.get('/auth',(req,res)=>{
    res.send('Hello I Am Backend! V2')
})

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
