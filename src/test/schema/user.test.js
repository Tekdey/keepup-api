const schema = require("../../schema");
const { faker } = require("@faker-js/faker");
const { mongoose } = require("mongoose");

const userData = {
  firstname: faker.name.firstName(),
  lastname: faker.name.lastName(),
  handicap: false,
  email: faker.internet.email(),
  password: faker.internet.password(),
  dob: "10/12/2002",
  description: faker.lorem.words(),
  sports: [
    {
      sport: faker.word.noun(),
      level: "Expert",
    },
  ],
  city: faker.address.cityName(),
  zipcode: faker.address.zipCode("#####"),
};

beforeAll((done) => {
  done();
});

afterAll((done) => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close();
  done();
});

/**
 * User model
 */
describe("User model", () => {
  it("create user successfully", async () => {
    const user = new schema["User"](userData);
    await user.setPassword(userData.password);
    // Object Id should be defined when successfully saved to MongoDB.
    expect(user._id).toBeDefined();
    expect(user.email).toBe(userData.email.toLowerCase());
    expect(user.password).not.toEqual(userData.password);
  });

  // You shouldn't be able to add in any field that isn't defined in the schema
  it("insert user successfully, but the field not defined in schema should be undefined", async () => {
    const userWithInvalidField = new schema["User"]({
      ...userData,
      fullname: faker.name.fullName(),
    });
    expect(userWithInvalidField._id).toBeDefined();
    expect(userWithInvalidField.fullname).toBeUndefined();
  });

  // It should us tell us the errors in on requiered field.
  it("create user without required field should failed", async () => {
    const userWithoutRequiredField = new schema["User"]({ gender: "Homme" });
    let err;
    try {
      await userWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.firstname).toBeDefined();
    expect(err.errors.lastname).toBeDefined();
    expect(err.errors.handicap).toBeDefined();
    expect(err.errors.email).toBeDefined();
    expect(err.errors.password).toBeDefined();
    expect(err.errors.dob).toBeDefined();
    expect(err.errors.city).toBeDefined();
    expect(err.errors.zipcode).toBeDefined();
  });

  // It should us tell us the errors in enum fields
  it("create user with wrong enum values", async () => {
    const userWithoutRequiredField = new schema["User"]({
      ...userData,
      gender: "WrongEnumValue",
      sports: [
        {
          sport: "632c41bcea31337d86eb1205",
          level: "WrongEnumValue",
        },
      ],
    });
    let err;
    try {
      await userWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.gender).toBeDefined();
  });

  // It should us tell us the errors in enum fields
  it("create user with a subdocument on sports but as empty fields", async () => {
    const userWithoutRequiredField = new schema["User"]({
      ...userData,
      sports: [
        {
          sport: null,
          level: "",
        },
      ],
    });
    let err;
    try {
      await userWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors["sports.0.sport"]).toBeDefined();
    expect(err.errors["sports.0.level"]).toBeDefined();
  });

  // It should us tell us the errors in age field
  it("crate a user with invalid date of birth", async () => {
    const userWithInvalidDob = new schema["User"]({
      ...userData,
      dob: "10/12/1000",
    });
    let err;
    try {
      await userWithInvalidDob.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors["dob"]).toBeDefined();
  });
});
