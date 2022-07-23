const chai = require("chai");
const { expect } = chai;
const {
  verifyResultOk,
  verifyResultError,
} = require("../../../helpers/verifiers");
const db = require("../../../../db/repository");
const ds = require("../../../helpers/dataSetup");
const RunQuery = require("../../../data/run-query");
const GetTodoQuery = require("../../../../resources/todo/query/get-todo-query");

describe.only("get user todo query", () => {
  let todo;
  beforeEach(async () => {
    todo = await ds.createSingle(ds.todo);
  });

  it("should get all todo of a particular user", async () => {
    const fetchedTodoResponse = await db.execute(
      new GetTodoQuery(todo.user.id)
    );

    verifyResultOk((fetchedTodo) => {
      expect(todo.name).eql(fetchedTodo[0].dataValues.name);
      expect(todo.description).eql(fetchedTodo[0].dataValues.description);
      expect(todo.user.id).eql(fetchedTodo[0].dataValues.userId);
    })(fetchedTodoResponse);

    const fetchedUserResponse = await db.findOne(
      new RunQuery('select * from  public."Todos" where "userId"=:userId', {
        userId: todo.user.id,
      })
    );

    verifyResultOk((fetchedTodo) => {
      expect(todo.name).eql(fetchedTodo.name);
      expect(todo.description).eql(fetchedTodo.description);
      expect(todo.user.id).eql(fetchedTodo.userId);
    })(fetchedUserResponse);
  });

  after(async () => {
    await ds.deleteAll();
  });
});
