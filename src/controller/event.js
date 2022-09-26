module.exports = {
  async create({ body }, res, next) {
    res.send("hello event");
  },
};
