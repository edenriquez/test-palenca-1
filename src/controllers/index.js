const constants = require("../constants");
const jwt = require("jsonwebtoken");

const hello = async (req, res, next) => {
  res.send(constants.responses.hello);
};

const uber = {
  login: async (req, res, next) => {
    const token = jwt.sign(
      {
        email: process.env.EMAIL,
        password: process.env.PASS,
      },
      process.env.TOKEN_SECRET
    );

    /**
     * In case frontend the client uses the token via header
     * we add it to the header with auth-token key
     * then chain the json response back to the user
     */
    res.header("auth-token", token).json({
      message: constants.responses.success,
      access_token: token,
    });
  },
};

module.exports = {
  hello,
  uber,
};
