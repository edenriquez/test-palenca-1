require("dotenv").config();

const { server } = require("../../../server");
const supertest = require("supertest");
const requestWithSupertest = supertest(server);

const constants = require("../../../src/constants");

describe("Uber", () => {
  describe("/uber", () => {
    it("GET /login should return access token ", async () => {
      const res = await requestWithSupertest.post("/uber/login").send({
        email: "pierre@palenca.com",
        pass: "MyPwdChingon123",
      });

      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("access_token");
    });
    it("GET /login should return error by invalid email  ", async () => {
      const res = await requestWithSupertest.post("/uber/login").send({
        email: "anyother@email.com",
        pass: "MyPwdChingon123",
      });

      expect(res.status).toEqual(401);
      expect(res.body.message).toEqual(constants.responses.errors.invalid);
      expect(res.body.details).toEqual(constants.responses.errors.details);
    });
  });
});
