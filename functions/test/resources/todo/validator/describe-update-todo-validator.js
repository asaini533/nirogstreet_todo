const chai = require("chai");
const expect = chai.expect;
const {
  verifyResultOk,
  verifyResultError,
} = require("../../../helpers/verifiers");
const UpdateTodoValidation = require("../../../../resources/todo/validators/update-todo-validation");

describe("update todo validator", () => {
  it("should mandate user Id", async () => {
    let response = await UpdateTodoValidation.validate({});
    verifyResultError((error) => {
      expect(error.errMessage).to.include("todo id is not valid!");
    })(response);
  });

  it("should mandate todo Id", async () => {
    let response = await UpdateTodoValidation.validate({});
    verifyResultError((error) => {
      expect(error.errMessage).to.include("UserId is not valid!");
    })(response);
  });

  it("should be valid when we pass all data", async () => {
    let response = await UpdateTodoValidation.validate({
      todoId: "facc6324-3086-444a-a430-9918d789d9ec",
      userId: "d7d36bfc-89cf-457d-b3f5-edba762950d9",
    });
    verifyResultOk(() => {})(response);
  });
});
