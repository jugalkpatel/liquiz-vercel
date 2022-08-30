const createError = require("http-errors");
const { Quiz } = require("../models/quiz.model");
const { findMinimumRecord } = require("../utils/findMinimumRecord");

async function createQuiz(quizType) {
  const quiz = await Quiz.create({ quizType });

  if (!quiz) {
    throw createError.InternalServerError("Error occurred while creating quiz");
  }

  return quiz;
}

async function getQuiz(level) {
  const quiz = await Quiz.findOne({ quizType: level });

  if (!quiz) {
    throw createError.NotFound("Error occurred while finding quiz");
  }

  await Quiz.populate(quiz, {
    path: "questions",
    select: "-difficulty",
  });

  return quiz;
}

async function addHistoryRecordInQuiz({ level, currentRecord }) {
  const quiz = await Quiz.findOne({ quizType: level }).select(
    "-_id -questions"
  );

  if (quiz.leaderBoard.length < 10) {
    await Quiz.findOneAndUpdate(
      { quizType: level },
      { $push: { leaderBoard: currentRecord._id } },
      { new: true }
    );

    return true;
  }

  await Quiz.populate(quiz, {
    path: "leaderBoard",
    select: "-user -quiz -__v",
  });

  const minimumRecord = findMinimumRecord(quiz.leaderBoard, {
    id: currentRecord._id,
    lowestPoints: currentRecord.score,
    highestTime: currentRecord.totalTime,
  });

  if (currentRecord._id !== minimumRecord.id) {
    await Quiz.findOneAndUpdate(
      { quizType: level },
      {
        $pull: { leaderBoard: minimumRecord.id },
      },
      { new: true }
    );

    await Quiz.findOneAndUpdate(
      {
        quizType: level,
      },
      {
        $push: { leaderBoard: currentRecord._id },
      },
      { new: true }
    );

    return true;
  }

  return false;
}

async function getQuizLeaderBoard(level) {
  const quiz = await Quiz.findOne({ quizType: level });

  if (!quiz.leaderBoard.length) {
    return [];
  }

  await Quiz.populate(quiz, {
    path: "leaderBoard",
    select: "-quiz -__v -_id",
    populate: { path: "user", select: "name -_id" },
  });

  return quiz.leaderBoard;
}

module.exports = {
  createQuiz,
  getQuiz,
  addHistoryRecordInQuiz,
  getQuizLeaderBoard,
};
