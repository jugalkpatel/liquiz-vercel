const { v1: uuidv1 } = require("uuid");

const {
  createQuiz,
  getQuiz,
  getQuizLeaderBoard,
} = require("../services/quiz.services");

const { capitalize } = require("../utils/capitalize");

async function createQuizHandler(req, res) {
  const { quizType } = req.body;

  const quiz = await createQuiz(quizType);

  res.status(201).json({
    success: true,
    message: "Quiz Created Successfully",
    quiz,
  });
}

async function getQuizHandler(req, res) {
  const { level } = req.query;
  const quiz = await getQuiz(capitalize(level));

  res.status(200).json({
    success: true,
    quiz,
  });
}

async function getQuizLeaderBoardHandler(req, res) {
  const { level } = req.query;
  let leaderBoard = await getQuizLeaderBoard(level);

  if (!leaderBoard) {
    res.status(200).json({
      success: true,
      leaderBoard: [],
    });
  }

  // since leaderboard always has 10 entries, we can use inbuilt sort
  leaderBoard.sort((firstEl, secondEl) => {
    if (firstEl.score < secondEl.score) {
      return 1;
    }

    if (firstEl.score > secondEl.score) {
      return -1;
    }

    // control comes here when both scores are equal
    if (firstEl.time < secondEl.time) {
      return -1;
    }

    if (firstEl.time > secondEl.time) {
      return 1;
    }

    return 0;
  });

  leaderBoard = leaderBoard.map((record) => {
    return {
      id: uuidv1(),
      user: record.user.name,
      score: record.score,
      time: record.time,
    };
  });

  res.status(200).json({
    success: true,
    level,
    leaderBoard,
  });
}

module.exports = {
  createQuizHandler,
  getQuizHandler,
  getQuizLeaderBoardHandler,
};
