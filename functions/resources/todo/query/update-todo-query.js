const Models = require("../../../models");

module.exports = class CreateUserQuery {
  constructor(todoId, userId) {
    this.details = {
      todoId,
      userId,
    };
  }

  async get() {
    const activity = await Models.Todo.update(
      {
        status: "Completed",
      },
      { where: { id: this.details.todoId } }
    );

    return Models.Todo.findAll({ where: { userId: this.details.userId } });
  }
};
