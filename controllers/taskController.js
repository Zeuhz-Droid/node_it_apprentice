const Task = require("../models/taskModel");

exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find(req.query);

    if (!tasks.length) {
      res.status(404).json({
        status: "fail",
        message: "No tasks found",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

exports.getTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);

    if (!task) {
      res.status(404).json({
        status: "fail",
        message: "No task found with that ID",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      task,
    });
  } catch (error) {
    next(error);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const newTask = req.body;

    if (!newTask) {
      res.status(404).json({
        status: "fail",
        message: "Include a task to create.",
      });
      return;
    }

    const task = await Task.create(newTask);

    res.status(200).json({
      status: "success",
      task,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;

    const task = await Task.findByIdAndUpdate(taskId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      res.status(404).json({
        status: "fail",
        messagage: "No task found with that ID",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      task,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findByIdAndDelete(taskId);

    if (!task) {
      return res.status(404).json({
        status: "fail",
        message: "No task found with that ID",
      });
    }

    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
