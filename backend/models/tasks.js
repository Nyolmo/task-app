import mongoose from "mongoose";
import { taskSchema } from "../schemas/tasksSchema.js";

export const Task = mongoose.model('Task', taskSchema);
