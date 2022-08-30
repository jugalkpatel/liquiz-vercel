const express = require("express");
const asyncHandler = require("express-async-handler");

const {
  createQuestionHandler,
  getAllQuestionsHanlder,
} = require("../controllers/question.controllers");
const { validateRequest } = require("../middlewares/validate-request");
const { CreateQuestion } = require("../validation/createQuestion.schema");

const questionRoutes = express.Router();

questionRoutes
  .get("/", asyncHandler(getAllQuestionsHanlder))
  .post(
    "/add",
    validateRequest(CreateQuestion),
    asyncHandler(createQuestionHandler)
  );

module.exports = { questionRoutes };
