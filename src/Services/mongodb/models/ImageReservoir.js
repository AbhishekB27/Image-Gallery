import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
    imageName:{
        type:String,
        required:true,
    },
    imageDescription:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
        required:true
    },
    pubished:{
        tyep:Date,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    collection:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Collection'
    },
});
export const Images = new mongoose.Model('Images', ImageSchema)
