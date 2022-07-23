const Route = require("../../../route");
const db = require("../../../db/repository");
const { v4: uuidv4 } = require("uuid");
const CreateTodoQuery = require("../query/create-todo-query");
const CreateTodoValidation = require("../validators/create-todo-validation");
const { respond, logInfo, composeResult, withArgs } = require("../../../lib");

async function post(req) {
  let { name, description } = req.body;
  let userId = req.params.id;

  let response = await composeResult(
    withArgs(
      db.execute,
      new CreateTodoQuery(uuidv4(), name, description, userId)
    ),
    CreateTodoValidation.validate
  )({ name, description, userId });

  return respond(response, "Todo Created Successfully", "something Went wrong");
}

Route.withOutSecurity().noAuth().post("/todo/:id", post).bind();

module.exports.post = post;
