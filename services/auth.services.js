const createError = require("http-errors");

const { User } = require("../models/user.model");
const {
  createPassword,
  validatePassword,
} = require("../services/password.services");
const { getAccessToken } = require("../helpers/jwt.helpers");

async function registerService({ email, name, password }) {
  const isUserAlreadyExists = await User.findOne({ email });

  if (isUserAlreadyExists) {
    throw createError.Conflict("Email is Already Registered");
  }

  const user = await User.create({ email, name });

  await createPassword({ secret: password, user: user._id });

  const accessToken = await getAccessToken(user._id);

  await User.populate(user, {
    path: "history",
    select: "-user",
    populate: {
      path: "quiz",
      select: "quizType -_id",
    },
  });

  return {
    userId: user._id,
    userName: user.name,
    accessToken,
    level: user.level,
    history: user.history,
  };
}

async function loginService({ email, password }) {
  const user = await User.findOne({ email });

  if (!user) {
    throw createError.NotFound("User is not registered");
  }

  await validatePassword({ user: user._id, password });

  const accessToken = await getAccessToken(user._id);

  await User.populate(user, {
    path: "history",
    select: "-user",
    populate: {
      path: "quiz",
      select: "quizType -_id",
    },
  });

  return {
    userId: user._id,
    userName: user.name,
    accessToken,
    level: user.level,
    history: user.history,
  };
}

module.exports = { registerService, loginService };
