const { createError } = require("../../helper/error/handler");

module.exports = {
  collection(req, res, next, collection) {
    const authorizedParam = ["user", "event", "message", "activity"];
    if (authorizedParam.includes(collection)) {
      next();
    } else {
      createError(
        401,
        `Seul ces parametres sont autorisés : [${authorizedParam}] `
      );
    }
  },
};
