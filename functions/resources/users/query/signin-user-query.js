const Models = require("../../../models");

module.exports = class CreateUserQuery {
  constructor(mobile, password) {
    this.details = {
      mobile,
      password,
    };
  }

  get() {
    return Models.User.findOne({
      where: { mobile: this.details.mobile },
    });
  }
};
