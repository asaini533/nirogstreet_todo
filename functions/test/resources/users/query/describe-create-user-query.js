const chai = require("chai");
const { expect } = chai;
const {
  verifyResultOk,
  verifyResultError,
} = require("../../../helpers/verifiers");
const { v4: uuidv4 } = require("uuid");
const db = require("../../../../db/repository");
const ds = require("../../../helpers/dataSetup");
const RunQuery = require("../../../data/run-query");
const CreateUserQuery = require("../../../../resources/users/query/create-user-query");

describe.only("create user query", () => {
  let user;
  beforeEach(async () => {
    user = await ds.buildSingle(ds.user);
  });

  it("should create a user", async () => {
    const createdUserResponse = await db.execute(
      new CreateUserQuery(
        user.id,
        user.name,
        user.mobile,
        user.gender,
        user.country,
        user.hobby,
        user.email,
        user.password
      )
    );
    verifyResultOk((createdUser) => {
      expect(user.name).eql(createdUser.name);
      expect(user.mobile).eql(createdUser.mobile);
      expect(user.gender).eql(createdUser.gender);
      expect(user.country).eql(createdUser.country);
      expect(user.hobby).eql(createdUser.hobby);
      expect(user.email).eql(createdUser.email);
      expect(user.password).eql(createdUser.password);
    })(createdUserResponse);

    const fetchedUserResponse = await db.findOne(
      new RunQuery('select * from  public."Users" where mobile=:mobile', {
        mobile: user.mobile,
      })
    );

    verifyResultOk((createdUser) => {
      expect(user.name).eql(createdUser.name);
      expect(user.mobile).eql(createdUser.mobile);
      expect(user.gender).eql(createdUser.gender);
      expect(user.country).eql(createdUser.country);
      expect(user.hobby).eql(createdUser.hobby);
      expect(user.email).eql(createdUser.email);
      expect(user.password).eql(createdUser.password);
    })(fetchedUserResponse);
  });

  after(async () => {
    await ds.deleteAll();
  });
});
