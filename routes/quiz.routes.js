const express = require("express");
const asyncHandler = require("express-async-handler");

const {
  createQuizHandler,
  getQuizHandler,
  getQuizLeaderBoardHandler,
} = require("../controllers/quiz.controllers");

const { Level } = require("../validation/quiz.schema");
const { validateRequest } = require("../middlewares/validate-request");
const { tokenValidator } = require("../middlewares/token-validator");

const quizRoutes = express.Router();

quizRoutes
  .get("/", validateRequest(Level), asyncHandler(getQuizHandler))
  .post("/add", asyncHandler(createQuizHandler))
  .get(
    "/leaderboard",
    validateRequest(Level),
    asyncHandler(getQuizLeaderBoardHandler)
  );

module.exports = { quizRoutes };
