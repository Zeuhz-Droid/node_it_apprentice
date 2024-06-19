const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const taskRouter = require("./routes/taskRoutes");
const mongoSanitize = require("express-mongo-sanitize");

require("dotenv").config();

require("./db")();

const app = express();

app.use(helmet());

app.use(mongoSanitize());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json({ extended: false }));

app.use("/api/tasks", taskRouter);

app.use("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: "Page not found",
  });
});

const PORT = process.env.PORT || 5174;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
