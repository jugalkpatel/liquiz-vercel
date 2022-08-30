const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const quizSchema = Schema(
  {
    quizType: {
      type: String,
      required: true,
      enum: ["Rookie", "Skillful", "Expert"],
    },
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    leaderBoard: [{ type: Schema.Types.ObjectId, ref: "History" }],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        ret.level = ret.quizType;
        delete ret.quizType;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const Quiz = model("Quiz", quizSchema);

module.exports = { Quiz };