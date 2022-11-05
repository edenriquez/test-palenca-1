require("dotenv").config();

const { server } = require("../../../server");
const supertest = require("supertest");
const requestWithSupertest = supertest(server);

const constants = require("../../../src/constants");

describe("Uber", () => {
  describe("/uber", () => {
    describe("/login", () => {
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
    describe("/profile", () => {
      let token;
      beforeEach(async () => {
        token = await requestWithSupertest.post("/uber/login").send({
          email: "pierre@palenca.com",
          pass: "MyPwdChingon123",
        });
      });
      it("GET /access_token should return profile info  ", async () => {
        const res = await requestWithSupertest.get(
          `/uber/profile/${token.body.access_token}`
        );

        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("platform");
        expect(res.body).toHaveProperty("profile");

        expect(res.body.message).toEqual(constants.responses.success);
        expect(res.body.platform).toEqual(constants.mockData.platform);
        expect(res.body.profile).toEqual(constants.mockData.profile);
      });

      it("GET /access_token should return an error  ", async () => {
        const res = await requestWithSupertest.get(`/uber/profile/not_a_token`);

        expect(res.status).toEqual(401);
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("details");

        expect(res.body.message).toEqual(constants.responses.errors.invalid);
        expect(res.body.details).toEqual(constants.responses.errors.details);
      });
    });
  });
});
