const createError = require("http-errors");
const { Question } = require("../models/question.model");
const { Quiz } = require("../models/quiz.model");

async function createQuestion({ question, options, answers, quizType }) {
  const quiz = await Quiz.findOne({ quizType });

  if (!quiz) {
    throw createError.InternalServerError("Quiz Type is not available");
  }

  const addedQuestion = await Question.create({
    question,
    options,
    answers,
    difficulty: quiz._id,
  });

  if (!addedQuestion) {
    throw createError.InternalServerError("Failed to create Question");
  }

  const isQuizUpdated = await Quiz.findOneAndUpdate(
    { quizType },
    { $addToSet: { questions: addedQuestion._id } },
    { new: true }
  );

  if (!isQuizUpdated) {
    throw createError.InternalServerError(
      "Error while adding question to quiz"
    );
  }

  return addedQuestion;
}

async function getAllQuestions() {
  const questions = await Question.find({});

  if (!questions.length) {
    throw createError.InternalServerError(
      "Error while searching for questions"
    );
  }

  await Question.populate(questions, {
    path: "difficulty",
    select: "-questions -leaderBoard",
  });

  return questions;
}

module.exports = { createQuestion, getAllQuestions };
