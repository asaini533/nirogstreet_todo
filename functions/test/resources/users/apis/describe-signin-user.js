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
const SigninUserQuery = require("../../../../resources/users/query/signin-user-query");

describe("descibe SignIn user api", () => {
  let sandbox = sinon.createSandbox();
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        mobile: 6467485885,
        password: "123",
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

  it("should signin a user", async () => {
    sandbox
      .mock(db)
      .expects("execute")
      .withArgs(
        verifyArgs((query) => {
          expect(query).to.be.instanceOf(SigninUserQuery);
        })
      )
      .returns(
        resolveOk({
          name: "Test User",
          email: "test@hdjf.com",
          mobile: "6467485885",
        })
      );

    const response = await TestRoutes.execute(
      "/users/signin",
      "Post",
      req,
      res
    );

    expect(response).to.eql({
      status: true,
      message: "User Fetched Successfully",
      entity: {
        name: "Test User",
        email: "test@hdjf.com",
        mobile: "6467485885",
      },
    });
  });

  it("should not signin a user", async () => {
    sandbox
      .mock(db)
      .expects("execute")
      .returns(resolveError("some random error"));

    const response = await TestRoutes.executeWithError(
      "/users/signin",
      "Post",
      req,
      res
    );

    expect(response).to.eql(
      new ApiError(0, "some random error", "Authentication falied")
    );
  });

  afterEach(() => {
    sandbox.verifyAndRestore();
  });
});
