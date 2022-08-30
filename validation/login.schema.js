const { object, string } = require("yup");

const Login = object({
  email: string().email().required().lowercase(),
  password: string()
    .trim()
    .min(6, "password must be six characters long")
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
      "password must contains atleast one uppercase letter, one lowercase letter and one number"
    ),
});

module.exports = { Login };
