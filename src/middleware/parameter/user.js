const { createError } = require("../../helper/error/handler");
const ObjectId = require("mongoose").Types.ObjectId;

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
  id(req, res, next, id) {
    if (ObjectId.isValid(id)) {
      next();
    } else {
      createError(401, `L'id n'est pas valide`);
    }
  },
};
