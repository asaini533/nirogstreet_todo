const ApiError = require("../../../../lib/functional/api-error");
const ValidationError = require("../../../../lib/validation-error");
const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const { expect } = chai;
const TestRoutes = require("../../../helpers/test-route");
chai.use(sinonChai);
const uuid = require("uuid");
const db = require("../../../../db/repository");
const {
  resolveDbResult,
  resolveOk,
  resolveError,
  validationError,
} = require("../../../helpers/resolvers");
const { verifyArgs } = require("../../../helpers/verifiers");
const UpdateTodoQuery = require("../../../../resources/todo/query/update-todo-query");

describe("descibe update todo api", () => {
  let sandbox = sinon.createSandbox();
  let req, res;

  beforeEach(() => {
    req = {
      params: {
        userId: "d7d36bfc-89cf-457d-b3f5-edba762950d9",
        id: "d7d36bfc-89cf-457d-b3f5-edba762950d9",
      },
    };
    res = {
      setHeader: sandbox.spy(),
      send: sandbox.spy(),
      status: sandbox.spy(() => {
        return res;
      }),
    };
  });

  it("should update status of a particualar todo activity", async () => {
    sandbox
      .mock(db)
      .expects("execute")
      .withArgs(
        verifyArgs((query) => {
          expect(query).to.be.instanceOf(UpdateTodoQuery);
        })
      )
      .returns(
        resolveOk([
          {
            name: "Test name activity",
            description: "test description",
            status: "Completed",
            userId: "d7d36bfc-89cf-457d-b3f5-edba762950d9",
          },
        ])
      );

    const response = await TestRoutes.execute(
      "/todo/:id/:userid",
      "Put",
      req,
      res
    );

    expect(response).to.eql({
      status: true,
      message: "Status changed Successfully",
      entity: [
        {
          name: "Test name activity",
          description: "test description",
          status: "Completed",
          userId: "d7d36bfc-89cf-457d-b3f5-edba762950d9",
        },
      ],
    });
  });

  it("should not update status of a particualar todo activity", async () => {
    sandbox
      .mock(db)
      .expects("execute")
      .returns(resolveError("some random error"));

    const response = await TestRoutes.executeWithError(
      "/todo/:id/:userid",
      "Put",
      req,
      res
    );

    expect(response).to.eql(
      new ApiError(0, "some random error", "something Went wrong")
    );
  });

  afterEach(() => {
    sandbox.verifyAndRestore();
  });
});
