const {
  createQuestion,
  getAllQuestions,
} = require("../services/question.services");

async function createQuestionHandler(req, res) {
  const { questions } = req.body;

  const addedQuestions = [];

  for (let question of questions) {
    const added = await createQuestion({ ...question });
    addedQuestions.push(added);
  }

  res.status(201).json({
    success: true,
    questions: addedQuestions,
  });
}

async function getAllQuestionsHanlder(req, res) {
  const questions = await getAllQuestions();

  res.status(200).json({
    success: true,
    questions,
  });
}

module.exports = { createQuestionHandler, getAllQuestionsHanlder };
