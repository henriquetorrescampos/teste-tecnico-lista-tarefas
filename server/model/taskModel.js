// managing strcuting of database and intaract with database

import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  task_name: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  due_date: {
    type: Date,
    required: true,
  },
  display_order: {
    type: Number,
    unique: true,
    required: true,
  },
});

export default mongoose.model("Task", taskSchema);
