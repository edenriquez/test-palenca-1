require("dotenv").config();

var express = require("express");
const bodyParser = require("body-parser");

const router = require("./src/routes");
const middleware = require("./src/middleware");

var HOST = process.env.APP_HOST;
var PORT = process.env.APP_PORT;

var app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(router);

app.use(middleware.errorHandler);

var server = app.listen(PORT, HOST, function () {
  console.log("server running at http://%s:%s", HOST, PORT);
});
