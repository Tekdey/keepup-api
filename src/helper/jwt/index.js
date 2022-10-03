const jwt = require("jsonwebtoken");

module.exports = {
  sign({ access, refresh, token }) {
    return jwt.sign(
      access || refresh || token,
      access
        ? process.env.JWTACCESS
        : refresh
        ? process.env.JWTREFRESH
        : process.env.JWT_RESET_PASSWORD,
      {
        expiresIn: access ? "1h" : refresh ? "7d" : "600s",
      }
    );
  },

  verify({ access, refresh, token }, callback) {
    return jwt.verify(
      access || refresh || token,
      access
        ? process.env.JWTACCESS
        : refresh
        ? process.env.JWTREFRESH
        : process.env.JWT_RESET_PASSWORD,
      callback
    );
  },
};
