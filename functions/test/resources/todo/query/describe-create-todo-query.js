const chai = require("chai");
const { expect } = chai;
const {
  verifyResultOk,
  verifyResultError,
} = require("../../../helpers/verifiers");
const db = require("../../../../db/repository");
const ds = require("../../../helpers/dataSetup");
const RunQuery = require("../../../data/run-query");
const CreateTodoQuery = require("../../../../resources/todo/query/create-todo-query");

describe.only("create todo query", () => {
  let user, todo;
  beforeEach(async () => {
    user = await ds.createSingle(ds.user);
    todo = await ds.buildSingle(ds.todo, { user });
  });

  it("should create add a new todo to the list", async () => {
    const createdTodoResponse = await db.execute(
      new CreateTodoQuery(todo.id, todo.name, todo.description, user.id)
    );

    verifyResultOk((createdTodo) => {
      expect(todo.name).eql(createdTodo[0].dataValues.name);
      expect(todo.description).eql(createdTodo[0].dataValues.description);
      expect(user.id).eql(createdTodo[0].dataValues.userId);
    })(createdTodoResponse);

    const fetchedUserResponse = await db.findOne(
      new RunQuery('select * from  public."Todos" where "userId"=:userId', {
        userId: user.id,
      })
    );

    verifyResultOk((createdTodo) => {
      expect(todo.name).eql(createdTodo.name);
      expect(todo.description).eql(createdTodo.description);
      expect(user.id).eql(createdTodo.userId);
    })(fetchedUserResponse);
  });

  after(async () => {
    await ds.deleteAll();
  });
});
