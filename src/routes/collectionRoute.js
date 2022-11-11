import express from 'express' 
import {body,validationResult} from 'express-validator'
import { CollectionI} from '../Services/mongodb'
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
    const {cName, cDescription,userId,imageUrls} = req.body
    console.log(userId)
    console.log(imageUrls)
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
        const oldCollection = await CollectionI.findOne({cName:cName})
        if(oldCollection != null) {
            message = {
                status: "Failed",
                data: null,
                message: "Already Exists 🤷‍♀️",
              };
              return res.json(message);
        }
        const collectionI = new CollectionI({cName,cDescription,userId,imageUrls})
        await collectionI.save();
        message = {
          status: "Success",
          data: collectionI,
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
        const collection = await CollectionI.find({})
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
            data:collection,
            message: 'Successfully Fetched CollectionI'
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
router2.put("/addA",
body('cId').notEmpty(),
body('imageUrl').notEmpty(),
async(req,res)=>{
    const {cId,imageUrl} = req.body
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
        const collectionI =  await CollectionI.findByIdAndUpdate({_id:cId},
            {$push: {"imageUrls":imageUrl}})
        // await collectionI.save();
        message = {
          status: "Success",
          data: collectionI,
          message: "Created😊",
        };
        res.json(message);
    } catch (error) {
        console.log(error.message)
        message = {
            status: "Failed",
            data: null,
            message: `${error.message}😞`,
          };
          res.json(message);
    }
})
export default router2;