const jwt = require("../helper/jwt");

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
        throw err;
      }

      return result;
    });

    req.user = decodedToken;

    next();
  },
};
