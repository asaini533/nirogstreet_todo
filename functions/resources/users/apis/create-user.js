const Route = require("../../../route");
const db = require("../../../db/repository");
const { v4: uuidv4 } = require("uuid");
const CreateUserQuery = require("../query/create-user-query");
const CreateUserValidation = require("../validators/create-user-validation");
const { respond, logInfo, composeResult, withArgs } = require("../../../lib");

async function post(req) {
  let { name, mobile, gender, country, hobby, email, password } = req.body;

  let response = await composeResult(
    withArgs(
      db.execute,
      new CreateUserQuery(
        uuidv4(),
        name,
        mobile,
        gender,
        country,
        hobby,
        email,
        password
      )
    ),
    CreateUserValidation.validate
  )({ name, mobile, gender, country, hobby, email, password });

  return respond(response, "User Created Successfully", "something Went wrong");
}

Route.withOutSecurity().noAuth().post("/users", post).bind();

module.exports.post = post;
