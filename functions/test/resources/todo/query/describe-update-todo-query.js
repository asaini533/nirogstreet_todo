const chai = require("chai");
const { expect } = chai;
const {
  verifyResultOk,
  verifyResultError,
} = require("../../../helpers/verifiers");
const db = require("../../../../db/repository");
const ds = require("../../../helpers/dataSetup");
const RunQuery = require("../../../data/run-query");
const UpdateTodoQuery = require("../../../../resources/todo/query/update-todo-query");

describe.only("update todo query", () => {
  let todo;
  beforeEach(async () => {
    todo = await ds.createSingle(ds.todo);
  });

  it("should update the desired todo activity", async () => {
    const fetchedTodoResponse = await db.execute(
      new UpdateTodoQuery(todo.id, todo.user.id)
    );

    verifyResultOk((fetchedTodo) => {
      expect(fetchedTodo[0].dataValues.status).eql("Completed");
    })(fetchedTodoResponse);

    const fetchedUserResponse = await db.findOne(
      new RunQuery('select * from  public."Todos" where "id"=:id', {
        id: todo.id,
      })
    );

    verifyResultOk((fetchedTodo) => {
      expect(fetchedTodo.status).eql("Completed");
    })(fetchedUserResponse);
  });

  after(async () => {
    await ds.deleteAll();
  });
});
