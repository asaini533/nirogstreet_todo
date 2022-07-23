const chai = require("chai");
const expect = chai.expect;
const {
  verifyResultOk,
  verifyResultError,
} = require("../../../helpers/verifiers");
const GetTodoValidation = require("../../../../resources/todo/validators/get-todo-validation");

describe("create todo validation", () => {
  it("should mandate user id", async () => {
    let response = await GetTodoValidation.validate({});

    verifyResultError((error) => {
      expect(error.errMessage).to.include("UserId is not valid!");
    })(response);
  });

  it("should be valid when we pass all data", async () => {
    let response = await GetTodoValidation.validate({
      userId: "d7d36bfc-89cf-457d-b3f5-edba762950d9",
    });

    verifyResultOk(() => {})(response);
  });
});
