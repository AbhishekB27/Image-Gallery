import mongoose from 'mongoose';

const CollectionSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    description:{
        type:String,
        required:true
    }
});

export const Collection = new mongoose.Model('Collection', CollectionSchema)