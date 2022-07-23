const { validate, notEmpty, shouldBeUuid } = require("../../../validation");

const rule = {
  todoId: [[shouldBeUuid, "todo id is not valid!"]],
  userId: [[shouldBeUuid, "UserId is not valid!"]],
};

module.exports.validate = async (data) => validate(rule, data);
