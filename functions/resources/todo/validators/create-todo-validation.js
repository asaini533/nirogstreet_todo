const { validate, notEmpty, numeric } = require("../../../validation");

const rule = {
  name: [[notEmpty, "Name is mandatory!"]],
  description: [[notEmpty, "Description is mandatory"]],
  userId: [[notEmpty, "UserId is mandatory"]],
};

module.exports.validate = async (data) => validate(rule, data);
