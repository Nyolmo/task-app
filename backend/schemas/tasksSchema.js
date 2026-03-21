import mongoose from "mongoose";

export const taskSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            default:""
        },
        completed:{
            type:Boolean,
            default:false,

        }   
    },{timestamps:true}
);