import mongoose from "mongoose";
import { Task } from "../models/tasks.js";

//Get all tasks\

export const getAllTasks = async (req, res) => {
    console.log("GET /api/tasks hit", req.body);
    try {
        const tasks = await Task.find().sort({createdAt: -1});  //newest task first
        res.status(200).json(tasks);
        
    } catch (err) {
        console.log("Error while fetching tasks:", err);
        res.status(500).json({error: "Server error while fetching tasks"})
        
    }
}

//GET  a single Task by ID

export const getTaskById = async(req, res)=>{
    try {
        const { id} = req.params;
        const task = await Task.findById(id);
        if(!task){
            return res.status(400).json(`Task with id of ${id} not found`);
        }
        return res.status(200).json(task);        
    } catch (err) {
        console.log("error while fetching task", err);
        res.status(500).json({error:"Error while fetching task"})
    }
}

//Create Task

export const createTask = async(req, res)=> {
    console.log("POST /api/tasks hit", req.body);
    try {
        const { title, description, completed } = req.body;
        const newTask = new Task({ title, description, completed});
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);        
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error while creating task" });
                
    }
}

//Update task

export const updateTask = async (req, res)=> {
    const { id } = req.params;

        //validate mongoose id
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json(`Invalid task id ${id}`);
        }
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            req.body,
            {
                returnDocument:"after",
                runValidators:true

            }
        );
        if(!updatedTask){
            return res.status(404).json({error:"Task not found"});
        }
        return res.status(200).json(updatedTask);  
        
    } catch (err) {
        console.log("Error while Updating task:", err);
        res.status(500).json({error: 'Server error while updating Task'})
        
    }
}

//delete task

export const deleteTask = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json(`Invalid task id ${id}`);
    }
    
    try {

        const deletedTask = await Task.findByIdAndDelete(id);
        if(!deletedTask){
            return res.status(404).json({error:"Task not Found"});
        }
        return  res.status(200).json({message: `Task ${id} deleted successfully!`});
        
    } catch (err) {
        console.log("Error deleting task:", err);
        res.status(500).json({error:"Error deleting task"});
    }
}