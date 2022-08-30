const mongoose = require("mongoose");
const { hash, compare } = require("bcrypt");

const { model, Schema } = mongoose;

const PasswordSchema = Schema(
  {
    secret: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

PasswordSchema.pre("save", async function (next) {
  try {
    const encryptedSecret = await hash(this.secret, 10);
    this.secret = encryptedSecret;
    next();
  } catch (error) {
    next(error);
  }
});

PasswordSchema.methods.comparePasswords = async function (password) {
  try {
    return await compare(password, this.secret);
  } catch (error) {
    throw new Error(error);
  }
};

const Password = model("Password", PasswordSchema);

module.exports = { Password };
