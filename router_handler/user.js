const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtCfg = require("../config/jwt");
const { resData } = require("../common/resType");

exports.login = (req, res) => {
  const loginInfo = req.body;
  // get password from db by username
  // compareSync(明文密码，密文密码)
  const isConsistent = bcrypt.compareSync("12345", loginInfo.password);
  if (isConsistent) {
    // 生成jwt令牌，去掉敏感信息
    const payload = { username: loginInfo.username };
    const token = jwt.sign(payload, jwtCfg.jwtSecretKey, {
      expiresIn: "10h",
    });
    res.json(resData(true, 200, "success!", token));
  } else {
    // 用户名密码校验失败
    res.json(resData(false, 610, "username or password is incorrect!"));
  }
};
