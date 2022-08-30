function formatHistory(history) {
  return history.length
    ? history.map((record) => ({
        level: record.quiz.quizType,
        score: record.score,
        time: record.time,
        id: record.id,
      }))
    : [];
}

module.exports = { formatHistory };
