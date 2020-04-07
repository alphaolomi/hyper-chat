const request = require("supertest");
const app = require("../app");

describe("root endpoint", () => {
  it("should return root point", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
  });
});
