const constants = require("../constants");

async function hello(req, res, next) {
  res.send(constants.responses.hello);
}

module.exports = {
  hello,
};
