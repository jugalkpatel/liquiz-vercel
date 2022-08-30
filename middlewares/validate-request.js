function validateRequest(schema) {
  return async function (req, res, next) {
    try {
      const data = Object.entries(req.query).length ? req.query : req.body;
      await schema.validate(data);
      return next();
    } catch (err) {
      return next(err);
    }
  };
}

module.exports = { validateRequest };
