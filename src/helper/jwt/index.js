const jwt = require("jsonwebtoken");

module.exports = {
  sign({ access, refresh }) {
    return jwt.sign(
      access || refresh,
      access ? process.env.JWTACCESS : process.env.JWTREFRESH,
      {
        expiresIn: access ? "1h" : "7d",
      }
    );
  },

  verify({ access, refresh }, callback) {
    return jwt.verify(
      access || refresh,
      access ? process.env.JWTACCESS : process.env.JWTREFRESH,
      callback
    );
  },
};
