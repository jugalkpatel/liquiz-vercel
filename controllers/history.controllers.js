const { createHistoryRecord } = require("../services/history.services");
const {
  getQuiz,
  addHistoryRecordInQuiz,
} = require("../services/quiz.services");
const {
  addHistoryRecordInUser,
  updateUserLevel,
  getUserHistory,
} = require("../services/user.services");
const { LEVEL_UP_SCORE } = require("../utils/constants");
const { formatHistory } = require("../utils/formatHistory");
const { capitalize } = require("../utils/capitalize");

async function getHistoryHandler(req, res) {
  const userID = req.userID;

  const history = await getUserHistory(userID);

  res.status(201).json({
    success: true,
    history,
  });
}

async function createHistoryHandler(req, res) {
  const levels = ["Rookie", "Skillful", "Expert"];
  const { level, score, time } = req.body;
  const userID = req.userID;
  const { _id: quizID } = await getQuiz(capitalize(level));
  let updatedLevel = level;

  const historyRecord = await createHistoryRecord({
    user: userID,
    level: quizID,
    score,
    time,
  });

  const updatedHistory = await addHistoryRecordInUser(
    userID,
    historyRecord._id
  );

  const history = formatHistory(updatedHistory);

  const isInLeaderBoard = await addHistoryRecordInQuiz({
    level,
    currentRecord: historyRecord,
  });

  if (score >= LEVEL_UP_SCORE) {
    const levelIndex = levels.indexOf(level);
    if (levelIndex < 2) {
      updatedLevel = await updateUserLevel(userID, levels[levelIndex + 1]);
    }
  }

  res.status(201).json({
    success: true,
    details: { isInLeaderBoard, updatedLevel, history },
  });
}

module.exports = { getHistoryHandler, createHistoryHandler };
