import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
    stars: {
      type: Number,
      // required: true
    },
    review: {
      type: String,
      required: true,
      unique:true
    },
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'User',
      unique: true
    },
    imgId:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'ImageReservoir'
    }
  });

export const Review = new mongoose.model('Review', ReviewSchema)