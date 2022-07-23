const chai = require("chai");
const expect = chai.expect;
const {
  verifyResultOk,
  verifyResultError,
} = require("../../../helpers/verifiers");
const SignInUserValidation = require("../../../../resources/users/validators/signin-user-validation");

describe("sign in user validation", () => {
  it("should mandate user mobile", async () => {
    let response = await SignInUserValidation.validate({});

    verifyResultError((error) => {
      expect(error.errMessage).to.include("Mobile number is mandatory");
    })(response);
  });

  it("should mandate user password", async () => {
    let response = await SignInUserValidation.validate({});

    verifyResultError((error) => {
      expect(error.errMessage).to.include("Password is mandatory");
    })(response);
  });

  it("should be valid when we pass all data", async () => {
    let response = await SignInUserValidation.validate({
      mobile: 28782883728,
      password: "123",
    });

    verifyResultOk(() => {})(response);
  });
});
