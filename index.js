const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
const asyncHandler = require("express-async-handler");
const cors = require("cors");

const { connect } = require("./db/connect");
const { authRoutes } = require("./routes/auth.routes");
const { quizRoutes } = require("./routes/quiz.routes");
const { questionRoutes } = require("./routes/question.routes");
const { historyRoutes } = require("./routes/history.routes");

const { errorHandler } = require("./middlewares/error-handler");
const { tokenValidator } = require("./middlewares/token-validator");
const { userValidator } = require("./middlewares/user-validator");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get(
  "/",
  asyncHandler(tokenValidator),
  asyncHandler(userValidator),
  (req, res) => {
    res.send("hello, world");
  }
);

app.use("/auth", authRoutes);
app.use("/questions", questionRoutes);
app.use("/quiz", quizRoutes);
app.use("/history", historyRoutes);

app.use((req, res, next) => {
  return next(createError.NotFound(`${req.url} route does not exist`));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}/`);
  connect();
});
