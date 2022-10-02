import express from 'express' 
import {body,validationResult} from 'express-validator'
import { Category} from '../Services/mongodb'
// import { Collection } from '../Services/mongodb/models/collection'

const router2 = express.Router()
let message = {
    status: "",
    data: null,
    message: "",
  };

router2.post('/add',
body('cName').isLength({min:3}),
body('cDescription').isLength({min:3}),
async(req,res)=>{
    const {cName, cDescription} = req.body
    const {errors} = validationResult(req)
    if(errors.length > 0){
        message = {
            status: "Failed",
            data: errors,
            message: `${errors[0].msg} 😭`,
          };
    }
    try {
        const oldCategory = await Category.findOne({cName:cName})
        if(oldCategory != null) {
            message = {
                status: "Failed",
                data: null,
                message: "Already Exists 🤷‍♀️",
              };
              return res.json(message);
        }
        const category = new Category({cName,cDescription})
        await category.save();
        message = {
          status: "Success",
          data: category,
          message: "Created😊",
        };
        res.json(message);
    } catch (error) {
        console.log("Error: "+error.message)
        message = {
            status: "Failed",
            data: null,
            message: `${errors.message} 😭`,
          };
          res.json(message);
    }
})

router2.get('/all',async(req,res)=>{
    try {
        const category = await Category.find({})
        // const sorting = collectionImg.sort((a,b)=>{ // its for sorting object by name
        //     if (a.cName < b.cName) {
        //         return -1;
        //       }
        //       if (a.cName > b.cName) {
        //         return 1;
        //       }
        //       return 0;
        // })
        message ={
            status: 'Success',
            data:category,
            message: 'Successfully Fetched Category'
        } 
        res.json(message)
    } catch (error) {
        message ={
            status: 'Failed',
            data:null,
            message: error.message
        } 
        res.json(message)
        console.log(error.message)
    }
})
export default router2;