const express = require("express");
const router = express.Router();

const userHandler = require("../router_handler/user");

router.post("/login", userHandler.login);

module.exports = router;
