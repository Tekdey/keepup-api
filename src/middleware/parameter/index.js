module.exports = {
  user: require("./user"),

  dynamicController(controller) {
    return async (req, res, next) => {
      await controller[req.params?.collection].create(req, res, next);
    };
  },
};
