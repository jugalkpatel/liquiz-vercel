function findMinimumRecord(leaderBoard, initialValues) {
  const minimumRecord = leaderBoard.reduce(
    ({ id, lowestPoints, highestTime }, currRecord) => {
      if (currRecord.score < lowestPoints) {
        return {
          id: currRecord._id,
          lowestPoints: currRecord.score,
          highestTime: currRecord.totalTime,
        };
      }

      if (currRecord.score === lowestPoints) {
        if (currRecord.totalTime > highestTime) {
          return {
            id: currRecord._id,
            lowestPoints: currRecord.score,
            highestTime: currRecord.totalTime,
          };
        }
      }

      return { id, lowestPoints, highestTime };
    },
    initialValues
  );

  return minimumRecord;
}

module.exports = { findMinimumRecord };
