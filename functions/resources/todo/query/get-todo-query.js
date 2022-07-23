const Models = require("../../../models");

module.exports = class CreateUserQuery {
  constructor(userId) {
    this.details = {
      userId,
    };
  }

  async get() {
    return Models.Todo.findAll({ where: { userId: this.details.userId } });
  }
};
