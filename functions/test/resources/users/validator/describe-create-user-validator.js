const chai = require("chai");
const expect = chai.expect;
const {
  verifyResultOk,
  verifyResultError,
} = require("../../../helpers/verifiers");
const CreateUserValidation = require("../../../../resources/users/validators/create-user-validation");

describe("create user validation", () => {
  it("should mandate user name", async () => {
    let response = await CreateUserValidation.validate({});
    verifyResultError((error) => {
      expect(error.errMessage).to.include("Name is mandatory!");
    })(response);
  });

  it("should mandate mobile number", async () => {
    let response = await CreateUserValidation.validate({});

    verifyResultError((error) => {
      expect(error.errMessage).to.include("Mobile number is mandatory");
    })(response);
  });

  it("should mandate user gender", async () => {
    let response = await CreateUserValidation.validate({});

    verifyResultError((error) => {
      expect(error.errMessage).to.include("Gender is mandatory");
    })(response);
  });

  it("should mandate user country", async () => {
    let response = await CreateUserValidation.validate({});

    verifyResultError((error) => {
      expect(error.errMessage).to.include("Country is mandatory");
    })(response);
  });

  it("should mandate user hobby", async () => {
    let response = await CreateUserValidation.validate({});

    verifyResultError((error) => {
      expect(error.errMessage).to.include("Hobby is mandatory");
    })(response);
  });

  it("should mandate user Password", async () => {
    let response = await CreateUserValidation.validate({});

    verifyResultError((error) => {
      expect(error.errMessage).to.include("Password is mandatory");
    })(response);
  });

  it("should be valid when we pass all data", async () => {
    let response = await CreateUserValidation.validate({
      name: "Test User",
      mobile: 76754345676,
      gender: "Male",
      country: "India",
      hobby: "Sports",
      email: "test@gmail.com",
      password: "123",
    });

    verifyResultOk(() => {})(response);
  });
});
