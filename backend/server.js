import express from "express";
import mongoose from "mongoose";

const PORT = process.env.PORT || 3000;

const app = express();

mongoose
    .connect('mongodb://127.0.0.1:27017/task_app')
    .then(()=>console.log('Connected to database'))
    .catch((err)=> console.log(`Error: ${err}`));

app.listen(PORT, ()=>{
    console.log(`Server running on PORT: ${PORT}`)
});