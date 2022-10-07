const datamapper = require("../data/datamapper");
const express = require("express");
const { createError } = require("../helper/error/handler");

module.exports = {
  /**
   * Message controller to get messages by event.
   * ExpressMiddleware signature
   * @param {express.request.params.id} id Express request object
   * @param {express.Response} res Express response object
   * @param {express.NextFunction} next Express next function
   * @returns Route API JSON response
   */
  async getMessagesByEvent({ params: { id } }, res, next) {
    try {
      const messages = await datamapper.message.getMessagesByEvent(id);
      if (!messages) {
        createError(403, "No messages found");
      }
      // console.log(messages);
      res.json(messages);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Message controller to get messages by id.
   * ExpressMiddleware signature
   * @param {express.request.params.id} id Express request object
   * @param {express.Response} res Express response object
   * @param {express.NextFunction} next Express next function
   * @returns Route API JSON response
   */
  async deleteMessageById({ params: { id } }, res, next) {
    try {
      const messages = await datamapper.message.deleteOne(id);

      res.json(messages);
    } catch (error) {
      next(error);
    }
  },
};
