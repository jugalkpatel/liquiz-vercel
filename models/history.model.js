const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const historySchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    quiz: {
      type: Schema.Types.ObjectId,
      ref: "Quiz",
    },
    score: {
      type: Number,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
      },
    },
  }
);

const History = model("History", historySchema);

module.exports = { History };