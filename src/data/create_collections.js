const db = require("../config/mongodb");

try {
  db.createCollection("activity");
  db.createCollection("event");
  db.createCollection("message");
  db.createCollection("user");
  console.log("collections created");
} catch (error) {
  throw error;
}
