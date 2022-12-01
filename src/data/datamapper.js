const { createError } = require("../helper/error/handler");
const { User, Message } = require("../schema");
const { Activity } = require("../schema");
const { Event } = require("../schema");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
  user: {
    /**
     * Method to get a document from a id
     * ExpressMiddleware signature
     * @param {object} id id to search
     * @returns the document requested
     */
    async findOne(id) {
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
      return await User.findOneAndUpdate(user, newInfo, {
        returnDocument: "after",
      });
    },

    /**
     * Method to add a sport to a user
     * ExpressMiddleware signature
     * @param {import("mongoose").ObjectId} user id of the user
     * @param {import("mongoose").ObjectId} sport id of the sport
     * @returns confirmation of the update
     */
    async addSport(user, { sports }) {
      return await User.updateOne(user, sports);
    },
    /**
     * Method to delete an user by id
     * ExpressMiddleware signature
     * @param {import("mongoose").ObjectId} id objectId
     * @returns document(s) of the event(s) found
     */
    async deleteOne(id) {
      const { deletedCount } = await User.deleteOne({ _id: id });
      await Event.updateMany(
        {
          participant: { $elemMatch: { $eq: id } },
        },
        {
          $pull: { participant: id },
        }
      );
      await Event.deleteMany({ admin: id });
      await Message.deleteMany({ sender: id });

      return deletedCount;
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
      event.period.start = parseInt(event.period.start.replace(/:/g, ""));
      event.period.end = parseInt(event.period.end.replace(/:/g, ""));
      console.log(event);
      const newEvent = new Event(event);
      console.log("------------");
      console.log(newEvent);
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
      return Event.findOne({ _id: id })
        .populate({
          path: "participant",
          select: "_id  image_url firstname",
        })
        .populate({
          path: "admin",
          select: "_id  image_url firstname",
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
        throw new Error("Error datamapper");
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
        const test = body.date.from;
        query.date = { $gte: body.date.from, $lt: body.date.to };
      }

      if (body.period) {
        const start = parseInt(body.period.start.replace(/:/g, ""));
        const end = parseInt(body.period.end.replace(/:/g, ""));
        query["period.start"] = { $gte: start, $lt: end };
      }
      if (body.location.coordinates.length !== 0) {
        const radius = body.location.radius * 1000;
        query.location = {
          $near: { $geometry: body.location, $maxDistance: radius },
        };
      }
      return await Event.find(query)
        .populate({
          path: "participant",
          select: "_id  image_url firstname",
        })
        .populate({
          path: "sport",
        })
        .populate({
          path: "admin",
          select: "firstname _id image_url",
        });
    },
    /**
     * Method to delete an event by id
     * ExpressMiddleware signature
     * @param {import("mongoose").ObjectId} id objectId
     * @returns document(s) of the event(s) found
     */
    async deleteOne(id) {
      const { deletedCount } = await Event.deleteOne({ _id: id });
      return deletedCount;
    },
    /**
     * Method to get all user event by his id
     * ExpressMiddleware signature
     * @param {import("mongoose").ObjectId} id objectId
     * @returns document(s) of the event(s) found
     */
    async findAllEventByUser(id) {
      const event = await Event.find({
        $or: [{ admin: new ObjectId(id) }, { participant: new ObjectId(id) }],
      })
        .populate({
          path: "admin",
          select: "_id firstname",
        })
        .populate({
          path: "sport",
        })
        .select({
          gender: 0,
        });

      return event;
    },
    async findAllEventCreatedByUser(id) {
      const event = await Event.find({ admin: new ObjectId(id) })
        .populate({
          path: "admin",
          select: "_id firstname",
        })
        .populate({
          path: "sport",
        })
        .select({
          gender: 0,
        });

      return event;
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
            select: "firstname _id image_url",
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
      return message;
    },
  },
};
