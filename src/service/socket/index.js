// https://socket.io/how-to/use-with-express-session

function connect(io) {
  io.on("connection", (socket) => {
    console.log("✅");
    // const room = "63348fecf0805bc06edcbfdc";

    /**
     * Join event sockets listeners
     */
    socket.on("user:join", (payload, callback) => {
      socket.join(payload.event_id);

      socket.room = payload.event_id;
      payload.sender = "system";
      payload.text = `${payload.firstname} à rejoint le chat !`;

      socket.in(socket.room).emit("user:join", payload);
      callback(false, {
        ...payload,
        text: `Vous avez rejoint l'event de foot !`,
      });
    });

    /**
     * Send message sockets listeners
     */
    socket.on("user:send", (message, callback) => {
      console.log(message);
      socket.in(socket.room).emit("user:send", message);

      callback(false, message);
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
