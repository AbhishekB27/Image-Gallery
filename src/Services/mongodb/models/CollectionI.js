import mongoose from 'mongoose';

const CollectionSchema = new mongoose.Schema({
    cName:{
        type:String,
        required: true,
        unique: true
    },
    cDescription:{
        type:String,
        required:true
    },
    imageUrls:[
     {
        type:String,
        required:true
     }   
    ]
    ,
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});

export const CollectionI = new mongoose.model('CollectionI', CollectionSchema)