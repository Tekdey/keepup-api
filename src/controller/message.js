const datamapper = require("../data/datamapper");

module.exports = {
  async getMessagesByEvent({ params: { id } }, res, next) {
    try {
      const messages = await datamapper.message.getMessagesByEvent(id);
      res.json(messages);
    } catch (error) {
      next(error);
    }
  },
  async deleteMessageById({ params: { id } }, res, next) {
    try {
      const messages = await datamapper.message.deleteOne(id);

      res.json(messages);
    } catch (error) {
      next(error);
    }
  },
};
