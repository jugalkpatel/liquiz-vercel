const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const QuestionSchema = Schema(
  {
    question: {
      type: String,
      required: true,
      unique: true,
    },
    options: {
      type: [{ type: String, lowercase: true, trim: true }],
      required: true,
      lowercase: true,
    },
    answers: {
      type: [{ type: String, lowercase: true, trime: true }],
      required: true,
    },
    difficulty: {
      type: Schema.Types.ObjectId,
      ref: "Quiz",
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.statement = ret.question;
        ret.id = ret._id;
        delete ret._id;
        delete ret.question;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const Question = model("Question", QuestionSchema);

module.exports = { Question };
