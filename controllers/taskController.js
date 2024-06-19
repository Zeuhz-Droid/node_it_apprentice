const Task = require("../models/taskModel");

exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find();

    if (!tasks.length) {
      res.status(404).json({
        status: "fail",
        message: "No tasks found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        tasks,
      },
    });
    next();
  } catch (error) {
    throw new Error(error);
  }
};

exports.getTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    const task = await Task.findById({ id });

    if (!task) {
      res.status(404).json({
        status: "fail",
        message: "No task found with that ID",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        task,
      },
    });
    next();
  } catch (error) {
    throw new Error(error);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const newTask = req.body;
    await Task.create({ newTask });

    res.status(200).json({
      status: "success",
      data: {
        newTask,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const task = req.params.id;
    await Task.findByIdAndUpdate({ task });

    if (!task) {
      res.status(404).json({
        status: "fail",
        messagage: "No task found with that ID",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        task,
      },
    });
    next();
  } catch (error) {
    throw new Error(error);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    const task = await Task.findByIdAndDelete({ id });

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
    next();
  } catch (error) {
    throw new Error(error);
  }
};
