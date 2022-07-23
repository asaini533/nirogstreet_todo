const Route = require("../../../route");
const db = require("../../../db/repository");
const uuid = require("uuid");
const GetTodoQuery = require("../query/get-todo-query");
const GetTodoValidation = require("../validators/get-todo-validation");
const { respond, logInfo, composeResult, withArgs } = require("../../../lib");

async function get(req) {
  let userId = req.params.id;

  let response = await composeResult(
    withArgs(db.execute, new GetTodoQuery(userId)),
    GetTodoValidation.validate
  )({ userId });

  return respond(
    response,
    "Todo activities fetch Successfully",
    "something Went wrong"
  );
}

Route.withOutSecurity().noAuth().get("/todo/:id", get).bind();

module.exports.get = get;
