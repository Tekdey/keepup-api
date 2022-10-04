const { createError } = require("../helper/error/handler");
const { User, Message } = require("../schema");
const { Activity } = require("../schema");
const { Event } = require("../schema");

module.exports = {
  user: {
    /**
     * Method to get a document from a id
     * ExpressMiddleware signature
     * @param {object} id id to search
     * @returns the document requested
     */
    async findOne(id) {
      if (!id) {
        throw error;
      }
      const searchKey = Object.keys(id)[0];

      try {
        return await User.findOne({
          [searchKey]: Object.values(id)[0],
        }).populate({
          path: "sports.sport",
        });
      } catch (error) {
        return error;
      }
    },

    /**
     * Method to get a custom document of a user from a id
     * ExpressMiddleware signature
     * @param {import("mongoose").ObjectId} id id to search
     * @returns the custom document requested
     */
    async getUserView(id) {
      if (!id) {
        throw error;
      }
      console.log(id);

      try {
        return await User.findOne(id, {
          _id: 1,
          image_url: 1,
          firstname: 1,
          city: 1,
          gender: 1,
          dob: 1,
          sports: 1,
        });
      } catch (error) {
        return error;
      }
    },

    /**
     * Method to get a custom document of a user from a id
     * ExpressMiddleware signature
     * @param {object} user data to create the new user
     * @returns the new user just created
     */
    async create(user) {
      if (!user) {
        throw error;
      }
      const newUser = User(user);

      await newUser.setPassword(user.password);

      return newUser;
    },

    /**
     * Method to update info(s) of a user
     * ExpressMiddleware signature
     * @param {import("mongoose").ObjectId} user id of the user
     * @param {object} newInfo new info(s) to update
     * @returns confirmation of the update
     */
    async updateOne(user, newInfo) {
      if (!user) {
        throw error;
      }

      return await User.updateOne(user, newInfo);
    },

    /**
     * Method to add a sport to a user
     * ExpressMiddleware signature
     * @param {import("mongoose").ObjectId} user id of the user
     * @param {import("mongoose").ObjectId} sport id of the sport
     * @returns confirmation of the update
     */
    async addSport(user, { sports }) {
      if (!user) {
        throw error;
      }

      return await User.updateOne(user, sports);
    },
  },
  event: {
    /**
     * Method to create an event
     * ExpressMiddleware signature
     * @param {object} event data to create the new event
     * @returns the new event just created
     */
    async create(event) {
      if (!event) {
        throw error;
      }
      event.period.start = parseInt(event.period.start.replace(/:/g, ""));
      event.period.end = parseInt(event.period.end.replace(/:/g, ""));
      const newEvent = new Event(event);

      return newEvent;
    },

    /**
     * Method to update info(s) of an event
     * ExpressMiddleware signature
     * @param {import("mongoose").ObjectId} event id of the event
     * @param {object} newInfo new info(s) to update
     * @returns confirmation of the update
     */
    async updateOne(event, newInfo) {
      if (!event) {
        throw error;
      }

      return await Event.updateOne(event, newInfo);
    },

    /**
     * Method to add a user to an event
     * ExpressMiddleware signature
     * @param {import("mongoose").ObjectId} event id of the event
     * @param {import("mongoose").ObjectId} user id of the user
     * @returns confirmation of the update
     */
    async addUser(event, user) {
      if (!event) {
        throw error;
      }
      return await Event.updateOne(
        { _id: event },
        {
          $addToSet: { participant: user },
        }
      );
    },

    /**
     * Method to remove a user from an event
     * ExpressMiddleware signature
     * @param {import("mongoose").ObjectId} event id of the event
     * @param {import("mongoose").ObjectId} user id of the user
     * @returns confirmation of the update
     */
    async removeUser(event, user) {
      if (!event) {
        throw error;
      }
      return await Event.updateOne(
        { _id: event },
        {
          $pull: { participant: user },
        }
      );
    },

    /**
     * Method to find an event by id
     * ExpressMiddleware signature
     * @param {import("mongoose").ObjectId} id id of the event
     * @returns document of the event requestedx
     */
    async findOne(id) {
      if (!id) {
        throw error;
      }
      return Event.findOne({ _id: id })
        .populate({
          path: "participant",
          select: "_id  image_url firstname  gender dob city sports",
        })
        .populate({
          path: "admin",
          select: "_id  image_url firstname  gender dob city sports",
        })
        .populate("sport");
    },

    /**
     * Method to find an event with filters
     * ExpressMiddleware signature
     * @param {object} body filter(s)
     * @returns document(s) of the event(s) found
     */
    async find(body) {
      let query = {};
      if (typeof body !== "object" && Object.keys(body).length !== 0) {
        throw error;
      }
      if (body.sport) {
        query.sport = [body.sport];
      }
      if (body.level) {
        query.level = [body.level];
      }
      if (body.genre) {
        query.genre = [body.genre];
      }
      if (body.date) {
        query.date = { $gte: body.date.from, $lt: body.date.to };
      }
      if (body.period) {
        const start = parseInt(body.period.start.replace(/:/g, ""));
        const end = parseInt(body.period.end.replace(/:/g, ""));
        query["period.start"] = { $gte: start, $lt: end };
      }
      if (body.location.coordinates.length !== 0) {
        query.location = {
          $near: { $geometry: body.location, $maxDistance: 10000 },
        };
      }
      return await Event.find(query).populate({
        path: "participant",
        select: "_id  image_url firstname",
      });
    },
  },
  activity: {
    /**
     * Method to get all activity
     * ExpressMiddleware signature
     * @returns all documents record
     */
    async findAll() {
      return await Activity.find();
    },
  },
  message: {
    /**
     * Method to get messages by event
     * ExpressMiddleware signature
     * @param {import("mongoose").ObjectId} id id of the event
     * @returns messages from the event
     */
    async getMessagesByEvent(id) {
      return await Event.findOne({ _id: id })
        .populate({
          path: "messages",
          options: { sort: { created_at: -1 } },
          populate: {
            path: "sender",
            select: "firstname _id",
          },
        })
        .select({ messages: 1, _id: 0 });
    },
    /**
     * Method to add messages in an event
     * ExpressMiddleware signature
     * @param {object} socket
     * @returns object with instance of message
     */
    async insert(socket) {
      const schema = {
        sender: socket.sender._id,
        receiver: socket.receiver,
        content: socket.content,
      };
      const message = Message(schema);

      const { matchedCount } = await Event.updateOne(
        { _id: socket.receiver },
        {
          $push: { messages: message._id },
        }
      );
      return { instance: message, matchedCount };
    },

    /**
     * Method to delete a message by his id
     * ExpressMiddleware signature
     * @param {object} socket
     * @returns the message deleted
     */
    async deleteOne(id) {
      const message = await Message.findByIdAndDelete({ _id: id });
      console.log(message);

      return message;
    },
  },
};
