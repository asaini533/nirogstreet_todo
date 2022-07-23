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
const GetTodoQuery = require("../../../../resources/todo/query/get-todo-query");

describe("descibe get todo api", () => {
  let sandbox = sinon.createSandbox();
  let req, res;

  beforeEach(() => {
    req = {
      params: { id: "d7d36bfc-89cf-457d-b3f5-edba762950d9" },
    };
    res = {
      setHeader: sandbox.spy(),
      send: sandbox.spy(),
      status: sandbox.spy(() => {
        return res;
      }),
    };
  });

  it("should get all todo activity of a user", async () => {
    sandbox
      .mock(db)
      .expects("execute")
      .withArgs(
        verifyArgs((query) => {
          expect(query).to.be.instanceOf(GetTodoQuery);
        })
      )
      .returns(
        resolveOk([
          {
            name: "Test name activity",
            description: "test description",
            status: "Pending",
            userId: "d7d36bfc-89cf-457d-b3f5-edba762950d9",
          },
        ])
      );

    const response = await TestRoutes.execute("/todo/:id", "Get", req, res);

    expect(response).to.eql({
      status: true,
      message: "Todo activities fetch Successfully",
      entity: [
        {
          name: "Test name activity",
          description: "test description",
          status: "Pending",
          userId: "d7d36bfc-89cf-457d-b3f5-edba762950d9",
        },
      ],
    });
  });

  it("should not fetch user todo activities", async () => {
    sandbox
      .mock(db)
      .expects("execute")
      .returns(resolveError("some random error"));

    const response = await TestRoutes.executeWithError(
      "/todo/:id",
      "Post",
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
