require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");

const taskRouter = require("./routes/taskRoutes");
const userRouter = require("./routes/userRoutes");

require("./db");

const app = express();

app.use(cors());

app.options("*", cors());

app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(mongoSanitize());

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/tasks", taskRouter);
app.use("/api/users", userRouter);

app.use("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: "Page not found",
  });
});

app.use((err, req, res, next) => {
  if (typeof err === "string") {
    return res.status(400).json({ message: err });
  }
  return res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 5174;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
