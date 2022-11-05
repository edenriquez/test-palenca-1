var express = require("express");
const bodyParser = require("body-parser");

const router = require("./src/routes");
const middleware = require("./src/middleware");

var app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(router);

app.use(middleware.errorHandler);

module.exports = { server: app };
