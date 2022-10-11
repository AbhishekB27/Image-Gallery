import express from "express";
import { body, check, validationResult } from "express-validator";
import isAuthenticated from "../middleware/isAuthenticated";
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
          res.json(message)
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

router4.post('/add',
// isAuthenticated,
body('review').isLength({min:3 ,max:150}),
async(req,res)=>{
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
    message = {
      status: "Failed",
      data: errors.errors,
      message: `${errors.errors[0].msg} 😒`,
    };
    return res.json(message);
  }
  try {
    const {imgId,review,stars,userId} = req.body
    const reviewD = new Review({imgId, review, stars, user:userId})
    await reviewD.save()
    message = {
      status: "Success",
      data: reviewD,
      message: `Uploaded😊`,
    };
    return res.json(message);
  } catch (error) {
    console.log(error.message);
    message = {
      status: "Failed",
      data: [],
      message: `${error.message}😒`,
    };
    return res.json(message);
  }
})

export default router4;
