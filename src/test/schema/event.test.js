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

const eventData = {
  name: faker.company.name(),
  sport: faker.lorem.word(),
  level: "Expert",
  handicap: false,
  max: Math.round(Math.random() * 100),
  date: "10/12/2022",
  messages: [],
  admin: "632c41bcea31337d86eb1205",
  participant: [],
  country: "Nimes",
  zipcode: 30000,
};

/**
 * Event model
 */

describe("Event model", () => {
  it("create event successfully", async () => {
    const event = new schema["Event"](eventData);
    // Object Id should be defined when successfully saved to MongoDB.
    expect(event._id).toBeDefined();
  });

  // You shouldn't be able to add in any field that isn't defined in the schema
  it("insert event successfully, but the field not defined in schema should be undefined", async () => {
    const eventWithInvalidField = new schema["Event"]({
      ...eventData,
      fullname: faker.name.fullName(),
    });
    expect(eventWithInvalidField._id).toBeDefined();
    expect(eventWithInvalidField.fullname).toBeUndefined();
  });

  // It should us tell us the errors in on requiered field.
  it("create event without required field should failed", async () => {
    const eventWithoutRequiredField = new schema["Event"]({ gender: "Femme" });
    let err;
    try {
      await eventWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.name).toBeDefined();
    expect(err.errors.sport).toBeDefined();
    expect(err.errors.handicap).toBeDefined();
    expect(err.errors.date).toBeDefined();
    expect(err.errors.admin).toBeDefined();
    expect(err.errors.city).toBeDefined();
    expect(err.errors.zipcode).toBeDefined();
  });

  // It should us tell us the errors in enum fields
  it("should not create event with wrong enum values", async () => {
    const eventWithoutRequiredField = new schema["Event"]({
      ...eventData,
      gender: "WrongEnumValue",
      level: "WrongEnumValue",
    });
    let err;
    try {
      await eventWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.gender).toBeDefined();
    expect(err.errors.level).toBeDefined();
  });

  // It should us tell us the errors in max field
  it("should not create a event with invalid max", async () => {
    const eventWithInvalidDob = new schema["Event"]({
      ...eventData,
      max: 101,
    });
    let err;
    try {
      await eventWithInvalidDob.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors["max"]).toBeDefined();
  });
});
