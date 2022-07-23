const Route = require("../../../route");
const db = require("../../../db/repository");
const uuid = require("uuid");
const UpdateTodoQuery = require("../query/update-todo-query");
// const CreateTodoValidation = require("../validators/create-todo-validation");
const { respond, logInfo, composeResult, withArgs } = require("../../../lib");

async function put(req) {
  let todoId = req.params.id;
  let userId = req.params.userid;

  let response = await composeResult(
    withArgs(db.execute, new UpdateTodoQuery(todoId, userId))
    // CreateTodoValidation.validate
  )({ todoId, userId });

  return respond(
    response,
    "Status changed Successfully",
    "something Went wrong"
  );
}

Route.withOutSecurity().noAuth().put("/todo/:id/:userid", put).bind();

module.exports.put = put;
