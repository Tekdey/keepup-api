// https://socket.io/how-to/use-with-express-session
const { message: db } = require("../../data/datamapper");
const jwt = require("../../helper/jwt");
const ObjectId = require("mongoose").Types.ObjectId;

function connect(io) {
  io.on("connection", (socket) => {
    console.log("✅");

    // io.use((socket, next) => {
    //   const token = socket.handshake.auth.token;
    //   const access = token.access
    //    try{
    //      jwt.verify({
    //          access: token.access,
    //      }, function(err, user) {
    //            if(err){
    //              next(createError(401, error))
    //            }
    //            socket.user = user
    //            next()
    //       });
    //    }catch(error){
    //      next(error)
    //    }
    // });

    /**
     * Join event sockets listeners
     */
    socket.on("user:join", (payload, callback) => {
      socket.join(payload.event_id);

      socket.room = payload.event_id;
      payload.sender = "system";
      payload.text = `${payload.firstname} est connecté !`;

      socket.in(socket.room).emit("user:join", payload);
      callback(false, {
        ...payload,
        text: `Vous êtes connecté !`,
      });
    });

    /**
     * Send message sockets listeners
     */
    socket.on("user:send", async (message, callback) => {
      
      socket.in(socket.room).emit("user:send", message);
      try {
        if (
          !ObjectId.isValid(message.sender._id) &&
          !ObjectId.isValid(message.receiver)
        ) {
          throw new Error("id invalid");
        }
        const { instance, matchedCount } = await db.insert(message);

        if (!matchedCount) {
          throw new Error("event invalid");
        }
        instance.save();
        callback(false, { ...message, _id: instance._id });
      } catch (error) {
        console.log(error);
        callback(true, { error });
      }
    });

    /**
     * Delete message listener
     */

    socket.on("user:delete-message", async (payload, callback) => {
      socket.in(socket.room).emit("user:delete-message", payload);
      try {
        if (!ObjectId.isValid(payload.id)) {
          throw new Error("id invalid");
        }

        await db.deleteOne(payload);

        callback(false, { ...payload });
      } catch (error) {
        console.log(error);
        callback(true, { error });
      }
    });

    /**
     * User disconnection listener
     */
    socket.on("disconnect", () => {
      console.log("❌");
    });
  });
}

module.exports = { connect };
