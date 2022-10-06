const { mongoose } = require("mongoose");

module.exports = {
  /**
   * Throw a custom error
   * @param {Integer} status request status
   * @param {String} message error message
   */
  createError(status, message) {
    const error = new Error(message);
    error.code = status;
    throw error;
  },
  /**
   * If they are no endpoint return error with status 404
   */
  notFound() {
    const error = new Error("La page n'a pas été trouvé");
    error.code = 404;
    throw error;
  },
  /**
   * Error handler returns custom error message for each status
   * @param {Object} err express error
   * @param {_} _
   * @param {Object} res express response
   * @param {__} __
   */
  manager(err, req, res, next) {
    console.log("_________________");
    console.log(err.message);
    console.log(err.code);
    console.log("_________________");

    if (err instanceof mongoose.Error.ValidationError) {
      err.message = err.message?.split(":")[2]?.trim();
      err.code = 403;
    }

    /**
     * Error Handler
     */
    switch (err.code) {
      case "JWT_ACCESS":
      case "JWT_REFRESH":
        res
          .status(401)
          .json({ status: "Error", code: err.code, error: err.message });
        break;
      case 401:
        res.status(err.code).json({ status: "Error", error: err.message });
        break;

      case 403:
        res.status(err.code).json({ status: "Error", error: err.message });
        break;

      case 404:
        res.status(err.code).json({ status: "Error", error: err.message });
        break;

      default:
        res.status(500).send({ status: "Error", error: "Internal Error" });
        break;
    }
  },
};
