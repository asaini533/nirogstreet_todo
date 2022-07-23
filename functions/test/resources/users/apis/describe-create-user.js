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
const CreateUserQuery = require("../../../../resources/users/query/create-user-query");

describe("descibe create user api", () => {
  let sandbox = sinon.createSandbox();
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        name: "Test User",
        mobile: 8447185553,
        gender: "Male",
        country: "India",
        hobby: "Sports",
        email: "test@test.com",
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

  it("should create a new user", async () => {
    sandbox
      .mock(db)
      .expects("execute")
      .withArgs(
        verifyArgs((query) => {
          expect(query).to.be.instanceOf(CreateUserQuery);
        })
      )
      .returns(
        resolveOk({
          name: "Test User",
          mobile: 8447185553,
          gender: "Male",
          country: "India",
          hobby: "Sports",
          email: "test@test.com",
          password: "123",
        })
      );

    const response = await TestRoutes.execute("/users", "Post", req, res);

    expect(response).to.eql({
      status: true,
      message: "User Created Successfully",
      entity: {
        name: "Test User",
        mobile: 8447185553,
        gender: "Male",
        country: "India",
        hobby: "Sports",
        email: "test@test.com",
        password: "123",
      },
    });
  });

  it("should not create a new user", async () => {
    sandbox
      .mock(db)
      .expects("execute")
      .returns(resolveError("some random error"));

    const response = await TestRoutes.executeWithError(
      "/users",
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
