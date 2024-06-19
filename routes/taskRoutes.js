const { Router } = require("express");
const taskcontroller = require("../controllers/taskController");

const router = Router();

router.route("/").get(taskcontroller.getTasks).post(taskcontroller.createTask);

router
  .route("/:id")
  .get(taskcontroller.getTask)
  .patch(taskcontroller.updateTask)
  .delete(taskcontroller.deleteTask);

module.exports = router;
