import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
    cName:{
        type:String,
    },
    cDescription:{
        type:String,
        required:true
    }
});

export const Category = new mongoose.model('Category', CategorySchema)