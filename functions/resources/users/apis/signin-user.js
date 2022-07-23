const Route = require("../../../route");
const db = require("../../../db/repository");
const uuid = require("uuid");
const Result = require("folktale/result");
const SignInUserQuery = require("../query/signin-user-query");
const SignInUserValidation = require("../validators/signin-user-validation");
const {
  respond,
  logInfo,
  composeResult,
  withArgs,
  whenResult,
} = require("../../../lib");

async function get(req) {
  let { mobile, password } = req.body;

  let response = await composeResult(
    withArgs(db.execute, new SignInUserQuery(mobile, password)),
    SignInUserValidation.validate
  )({ mobile, password });

  let authenticationResult = await whenResult((user) => {
    if (user) {
      if (user.password == password) {
        return Result.Ok({
          id: user.id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
        });
      } else {
        return Result.Error("Password didnt match");
      }
    } else {
      return Result.Error("User does'nt exist");
    }
  })(response);

  return respond(
    authenticationResult,
    "User Fetched Successfully",
    "Authentication falied"
  );
}

Route.withOutSecurity().noAuth().post("/users/signin", get).bind();

module.exports.get = get;
