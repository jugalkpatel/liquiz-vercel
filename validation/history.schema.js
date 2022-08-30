const { string, object, number } = require("yup");

const History = object({
  level: string().oneOf(["Rookie", "Skillful", "Expert"]).required(),
  score: number().required(),
  time: number().required(),
});

module.exports = { History };
