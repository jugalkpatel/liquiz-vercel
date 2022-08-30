const createError = require("http-errors");
const { History } = require('../models/history.model')

async function createHistoryRecord({ user, level, score, time }) {
  const historyRecord = await History.create({
    user,
    quiz: level,
    score,
    time,
  });

  if (!historyRecord) {
    throw createError.InternalServerError("Failed to create history record");
  }

  return historyRecord;
}

module.exports = { createHistoryRecord };
