const { object, string, ref } = require("yup");

const Register = object({
  email: string().email().required().lowercase(),
  name: string().trim().required().max(20).lowercase(),
  password: string()
    .trim()
    .required()
    .min(6, "password must be six characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
      "password must contains atleast one uppercase letter, one lowercase letter and one number"
    ),
  confirmPassword: string()
    .required()
    .oneOf([ref("password")]),
});

module.exports = { Register };
