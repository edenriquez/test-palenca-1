const express = require("express");
const router = express.Router();
const controllers = require("../controllers");

// public routes
router.get("/", controllers.hello);

router.post("/uber/login", [
  controllers.uber.emailValidation,
  controllers.uber.login,
]);

router.get("/uber/profile/:access_token", controllers.uber.profile);

module.exports = router;
