const express = require("express");
const router = express.Router();

const userHandler = require("../router_handler/user");

router.post("/login", userHandler.login);
router.get("/rules-setting/get", userHandler.getRuleSetting);

module.exports = router;
