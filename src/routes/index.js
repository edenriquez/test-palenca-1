const express = require("express");
const router = express.Router();
const controllers = require("../controllers");

// public routes
router.get("/", controllers.hello);

router.post("/uber/login", controllers.uber.login);

module.exports = router;
