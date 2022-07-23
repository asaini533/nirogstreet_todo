const { validate, notEmpty, numeric } = require("../../../validation");

const rule = {
  name: [[notEmpty, "Name is mandatory!"]],
  mobile: [[notEmpty, "Mobile number is mandatory"]],
  gender: [[notEmpty, "Gender is mandatory"]],
  country: [[notEmpty, "Country is mandatory"]],
  hobby: [[notEmpty, "Hobby is mandatory"]],
  email: [[notEmpty, "Email is mandatory"]],
  password: [[notEmpty, "Password is mandatory"]],
};

module.exports.validate = async (data) => validate(rule, data);
