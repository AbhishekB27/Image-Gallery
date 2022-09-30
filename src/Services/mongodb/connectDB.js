import mongoose from 'mongoose';

export const connectDB =  ()=>{
    try {
        mongoose.connect(process.env.MONGO_URL)
        console.log("Successfully connected to MongoDB");
    } catch (error) {
        console.log(error.message)
    }
}