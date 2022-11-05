const { server } = require("../../../server");
const supertest = require("supertest");
const requestWithSupertest = supertest(server);

const constants = require("../../../src/constants");

describe("Hello", () => {
  it("GET / should return plain text ", async () => {
    const res = await requestWithSupertest.get("/");

    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("text/html"));
    expect(res.text).toEqual(constants.responses.hello);
  });
});
