const express = require("express");
const asyncHandler = require("express-async-handler");

const { History } = require("../validation/history.schema");
const { userValidator } = require("../middlewares/user-validator");
const { tokenValidator } = require("../middlewares/token-validator");
const { validateRequest } = require("../middlewares/validate-request");
const {
  createHistoryHandler,
  getHistoryHandler,
} = require("../controllers/history.controllers");

const historyRoutes = express.Router();

historyRoutes.get(
  "/",
  tokenValidator,
  userValidator,
  asyncHandler(getHistoryHandler)
);

historyRoutes.post(
  "/add",
  validateRequest(History),
  tokenValidator,
  userValidator,
  asyncHandler(createHistoryHandler)
);

module.exports = { historyRoutes };
