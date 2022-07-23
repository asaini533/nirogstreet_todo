const { validate, notEmpty, numeric } = require("../../../validation");

const rule = {
  mobile: [[notEmpty, "Mobile number is mandatory"]],
  password: [[notEmpty, "Password is mandatory"]],
};

module.exports.validate = async (data) => validate(rule, data);
