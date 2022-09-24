const schema = require("../../schema");
const { faker } = require("@faker-js/faker");
const { mongoose } = require("mongoose");

beforeAll((done) => {
  done();
});

afterAll((done) => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close();
  done();
});

const messageData = {
  sender: new mongoose.Types.ObjectId(),
  receiver: new mongoose.Types.ObjectId(),
  content: faker.lorem.words(),
};

/**
 * Message model
 */
describe("Message model", () => {
  it("create message successfully", () => {
    const message = new schema["Message"](messageData);
    expect(message._id).toBeDefined();
    expect(message.sender).toBeDefined();
    expect(message.receiver).toBeDefined();
    expect(message.content).toBeDefined();
  });

  // You shouldn't be able to add in any field that isn't defined in the schema
  it("insert message successfully, but the field not defined in schema should be undefined", () => {
    const message = new schema["Message"]({
      ...messageData,
      fullname: faker.name.fullName(),
    });
    expect(message._id).toBeDefined();
    expect(message.fullname).toBeUndefined();
  });

  // It should us tell us the errors in on requiered field.
  it("create activity without required field should failed", async () => {
    const messageWithoutRequiredField = new schema["Message"]({
      content: "Lorem",
    });
    let err;
    try {
      await messageWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.receiver).toBeDefined();
    expect(err.errors.sender).toBeDefined();
  });

  // It should tell use the errors in ObjectId fields
  it("create message with wrong schema type in ObjectId field, should failed", async () => {
    const newMessage = new schema["Message"]({
      ...messageData,
      sender: "Lorem",
      receiver: "Ipsum",
    });
    let err;
    try {
      await newMessage.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.sender).toBeDefined();
    expect(err.errors.receiver).toBeDefined();
  });

  // It should tell use the errors in content fields
  it("create message with an empty content, should failed", async () => {
    const newMessage = new schema["Message"]({
      ...messageData,
      content: "",
    });
    let err;
    try {
      await newMessage.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.content).toBeDefined();
  });
});
