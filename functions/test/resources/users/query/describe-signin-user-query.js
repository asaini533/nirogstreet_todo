const chai = require("chai");
const { expect } = chai;
const {
  verifyResultOk,
  verifyResultError,
} = require("../../../helpers/verifiers");
const db = require("../../../../db/repository");
const ds = require("../../../helpers/dataSetup");
const RunQuery = require("../../../data/run-query");
const SigninUserQuery = require("../../../../resources/users/query/signin-user-query");

describe.only("sign in user query", () => {
  let user;
  beforeEach(async () => {
    user = await ds.createSingle(ds.user);
  });

  it("should sign in an user", async () => {
    const signinUserResponse = await db.execute(
      new SigninUserQuery(user.mobile, user.password)
    );

    verifyResultOk((createdUser) => {
      expect(user.mobile).eql(createdUser.mobile);
      expect(user.password).eql(createdUser.password);
    })(signinUserResponse);

    const fetchedUserResponse = await db.findOne(
      new RunQuery('select * from  public."Users" where mobile=:mobile', {
        mobile: user.mobile,
      })
    );

    verifyResultOk((createdUser) => {
      expect(user.mobile).eql(createdUser.mobile);
      expect(user.password).eql(createdUser.password);
    })(fetchedUserResponse);
  });

  after(async () => {
    await ds.deleteAll();
  });
});
