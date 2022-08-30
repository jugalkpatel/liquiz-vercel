const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = Schema(
  {
    email: {
      type: String,
      required: true,
      match: /.+\@.+\..+/,
      unique: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      max: 20,
    },
    level: {
      type: String,
      required: true,
      enum: ["Rookie", "Skillful", "Expert"],
      default: "Rookie",
    },
    history: [
      {
        type: Schema.Types.ObjectId,
        ref: "History",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const User = model("User", UserSchema);
module.exports = { User };
