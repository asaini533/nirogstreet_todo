const Models = require("../../../models");

module.exports = class CreateUserQuery {
  constructor(id, name, mobile, gender, country, hobby, email, password) {
    this.details = {
      id,
      name,
      mobile,
      gender,
      country,
      hobby,
      email,
      password,
    };
  }

  get() {
    return Models.User.create({
      id: this.details.id,
      name: this.details.name,
      mobile: this.details.mobile,
      gender: this.details.gender,
      country: this.details.country,
      hobby: this.details.hobby,
      email: this.details.email,
      password: this.details.password,
    });
  }
};
