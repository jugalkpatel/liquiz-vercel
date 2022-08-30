const { string, object } = require("yup");

const Level = object({
  level: string()
    .oneOf(["Rookie", "Skillful", "Expert"])
    .required("level is required"),
});

module.exports = { Level };
