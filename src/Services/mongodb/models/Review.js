import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Images'
    },
});

export const Review = new mongoose.Model('Review', ReviewSchema)