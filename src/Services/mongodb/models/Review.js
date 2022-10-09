import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
    stars: {
      type: Number,
      // required: true
    },
    review: {
      type: String,
      required: true
    },
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'User'
    }
  });

export const Review = new mongoose.model('Review', ReviewSchema)