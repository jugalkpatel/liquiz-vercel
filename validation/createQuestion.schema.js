const { string, array, object } = require("yup");

const Question = object({
  question: string("Question is Required").required().trim(),
  options: array()
    .of(string().required().lowercase())
    .min(2, "Minimum two options are required")
    .required(),
  answers: array()
    .min(1, "Atleast one Answer is Required")
    .of(string().required().lowercase())
    .required(),
  quizType: string().oneOf(["Rookie", "SkillFul", "Expert"]).required(),
});

const CreateQuestion = object({
  questions: array().of(Question).min(1, "Atleast One Question is required"),
});

module.exports = { Question, CreateQuestion };
