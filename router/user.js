const express = require("express");
const router = express.Router();

const userHandler = require("../router_handler/user");

router.get("/login", userHandler.login);

module.exports = router;
