import * as user from "../user";
describe("create user", () => {
  it("should run something and get something", async () => {
    const req = {
      body: {
        username: "hello",
        password: "hi",
      },
    };
    const res = {
      json({ token }) {
        expect(token).toBeTruthy();
      },
    };
    await user.createNewUser(req, res, () => {});
  });
});
