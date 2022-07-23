const chai = require("chai");
const expect = chai.expect;
const {
  verifyResultOk,
  verifyResultError,
} = require("../../../helpers/verifiers");
const CreateTodoValidation = require("../../../../resources/todo/validators/create-todo-validation");

describe("create todo validation", () => {
  it("should mandate todo name", async () => {
    let response = await CreateTodoValidation.validate({});

    verifyResultError((error) => {
      expect(error.errMessage).to.include("Name is mandatory!");
    })(response);
  });

  it("should mandate todo description", async () => {
    let response = await CreateTodoValidation.validate({});

    verifyResultError((error) => {
      expect(error.errMessage).to.include("Description is mandatory");
    })(response);
  });

  it("should mandate user id", async () => {
    let response = await CreateTodoValidation.validate({});

    verifyResultError((error) => {
      expect(error.errMessage).to.include("UserId is mandatory");
    })(response);
  });

  it("should be valid when we pass all data", async () => {
    let response = await CreateTodoValidation.validate({
      name: "Test User",
      description: "Test description!",
      userId: "d7d36bfc-89cf-457d-b3f5-edba762950d9",
    });

    verifyResultOk(() => {})(response);
  });
});
