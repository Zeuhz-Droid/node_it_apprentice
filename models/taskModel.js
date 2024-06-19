const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A task must have a title"],
    trim: true,
    maxlength: [150, "A task name must have less or equal to 40 characters"],
    minlength: [3, "A task name must have more or equal to 3 characters"],
    index: true,
    // match: [/^[a-zA-Z0-9- ]+$/],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
