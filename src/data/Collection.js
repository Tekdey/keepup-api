const MongooseConfig = require("../config/MongooseConfig");

class Collection extends MongooseConfig {
  constructor() {
    super();
  }

  create(list) {
    if (list.constructor.name !== "Array") {
      list = [list];
    }
    try {
      for (let i = 0; i < list.length; i++) {
        const name = list[i];
        this.db.createCollection(name);
        console.log(`${i} / ${list.length - 1} collection`);
      }
    } catch (error) {
      throw error;
    }
  }

  dropAll() {
    const list = this.db.modelNames();
    try {
      list.forEach((name, i) => {
        this.db.dropCollection(name);
        console.log(`${i} / ${list.length} collection`);
      });
    } catch (error) {
      throw error;
    }
  }

  dropOne(name) {
    try {
      this.db.dropCollection(name);
      console.log(`collection ${name} dropped`);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Collection;
