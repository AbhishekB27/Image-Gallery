import express from "express";
import { body, check, validationResult } from "express-validator";
import { Review } from "../Services/mongodb";
const router4 = express.Router();

let message = {
  status: "",
  data: null,
  message: "",
};

router4.get('/all',async(req,res)=>{
    try {
        const review = await Review.find({}).populate('user')
        message = {
            status: "Success",
            data: review,
            message: "Successfully Fetched",
          };
    } catch (error) {
        console.log(error.message)
        message = {
            status: "Failed",
            data: null,
            message: `${error.message} 😟`,
          };
          res.json(message);
    }
})


export default router4;
