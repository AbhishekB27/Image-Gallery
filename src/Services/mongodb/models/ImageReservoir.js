import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  imageUrl:{
      type: String,
      required: true,
      unique: true
    },
  created: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  review:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review",
  }],
  likes:{
    type: Number,
    // ref: "Like",
  }
});
export const ImageReservoir = new mongoose.model("ImageReservoir", ImageSchema);
