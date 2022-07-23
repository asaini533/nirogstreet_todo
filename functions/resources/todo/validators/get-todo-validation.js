const { validate, notEmpty, shouldBeUuid } = require("../../../validation");

const rule = {
  userId: [[shouldBeUuid, "UserId is not valid!"]],
};

module.exports.validate = async (data) => validate(rule, data);
