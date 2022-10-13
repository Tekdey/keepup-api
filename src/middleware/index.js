const jwt = require("../helper/jwt");
const { createError } = require("../helper/error/handler");

module.exports = {
  authenticate(req, res, next) {
    //
    const bearer = req.headers["authorization"];
    let token;
    if (bearer && bearer.startsWith("Bearer ")) {
      token = bearer.split(" ")[1];
    }

    const decodedToken = jwt.verify({ access: token }, function (err, result) {
      if (err) {
        createError("JWT_ACCESS", err.message);
      }

      return result;
    });
    req.user = decodedToken;

    next();
  },
  confirmChangePassword(req, res, next) {
    const bearer = req.headers["check_password_header"];
    let token;
    if (bearer && bearer.startsWith("Bearer ")) {
      token = bearer.split(" ")[1];
    }
    const decodedToken = jwt.verify({ token }, function (err, result) {
      if (err) {
        createError(401, "Le lien a expiré veuillez recommencer");
      }
      return result;
    });
    req.email = decodedToken;

    next();
  },
};
