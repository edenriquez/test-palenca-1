require("dotenv").config();
const { server } = require("./server");

var HOST = process.env.APP_HOST;
var PORT = process.env.APP_PORT;

server.listen(PORT, HOST, function () {
  console.log("server running at http://%s:%s", HOST, PORT);
});
