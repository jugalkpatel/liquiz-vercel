const createError = require("http-errors");
const { Password } = require("../models/password.model");

async function createPassword({ secret, user }) {
  await Password.create({ secret, user });
}

async function validatePassword({ user, password }) {
  const actualPassword = await Password.findOne({ user: user._id });

  const isPasswordValid = await actualPassword.comparePasswords(password);

  if (!isPasswordValid) {
    throw createError.Unauthorized("Email or Password is Invalid");
  }
}

module.exports = { createPassword, validatePassword };
