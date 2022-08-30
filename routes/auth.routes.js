const express = require("express");
const asyncHandler = require("express-async-handler");
const authRoutes = express.Router();
const {
  registerHandler,
  loginHandler,
} = require("../controllers/auth.controllers");

const { Login } = require("../validation/login.schema");
const { Register } = require("../validation/register.schema");
const { validateRequest } = require("../middlewares/validate-request");

authRoutes
  .post("/register", validateRequest(Register), asyncHandler(registerHandler))
  .post("/login", validateRequest(Login), asyncHandler(loginHandler));

module.exports = { authRoutes };
