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

const activityData = {
  category: faker.lorem.words,
  name: faker.lorem.word,
};

/**
 * Activity model
 */
describe("Activity model", () => {
  it("create activity successfully", () => {
    const activity = new schema["Activity"](activityData);

    expect(activity._id).toBeDefined();
    expect(activity.category).toBeDefined();
    expect(activity.name).toBeDefined();
  });

  // You shouldn't be able to add in any field that isn't defined in the schema
  it("insert activity successfully, but the field not defined in schema should be undefined", () => {
    const activity = new schema["Activity"]({
      ...activityData,
      temperature: "1°C",
    });
    expect(activity._id).toBeDefined();
    expect(activity.temperature).toBeUndefined();
  });

  // It should us tell us the errors in on requiered field.
  it("create activity without required field should failed", async () => {
    const categoryWithoutRequiredField = new schema["Activity"]({
      name: "Lorem",
    });
    let err;
    try {
      await categoryWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.category).toBeDefined();
  });
});
