const Models = require("../../../models");

module.exports = class CreateUserQuery {
  constructor(id, name, description, userId) {
    this.details = {
      id,
      name,
      description,
      userId,
    };
  }

  async get() {
    let user = await Models.User.findOne({
      where: {
        id: this.details.userId,
      },
    });

    await user.createTodo({
      id: this.details.id,
      name: this.details.name,
      description: this.details.description,
      status: "Pending",
    });

    return Models.Todo.findAll({ where: { userId: this.details.userId } });
  }
};
