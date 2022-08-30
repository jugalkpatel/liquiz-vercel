const { registerService, loginService } = require("../services/auth.services");
const { formatHistory } = require("../utils/formatHistory");


const registerHandler = async (req, res) => {
  const { email, name, password } = req.body;

  const { userId, userName, accessToken, level, history } =
    await registerService({
      email,
      name,
      password,
    });

  res.status(201).json({
    success: true,
    message: "Registered Successfully",
    user: {
      id: userId,
      name: userName,
      token: accessToken,
      level,
      history: formatHistory(history),
    },
  });
};

const loginHandler = async (req, res) => {
  const { email, password } = req.body;

  const { userId, userName, accessToken, level, history } = await loginService({
    email,
    password,
  });

  setTimeout(() => {
    res.status(201).json({
      success: true,
      message: "Authenticated Successfully",
      user: {
        id: userId,
        name: userName,
        token: accessToken,
        level,
        history: formatHistory(history),
      },
    });
  }, 5000);
};

module.exports = { registerHandler, loginHandler };
