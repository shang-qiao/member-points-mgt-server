const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtCfg = require("../config/jwt");
const db = require("../db");
const { resData } = require("../common/resType");
const { decrypt } = require("../utils/rsaEncrypt");

exports.login = async (req, res) => {
  const loginInfo = req.body;
  // 1. 加密得到明文密码
  const password = decrypt(loginInfo.password);
  // 2. get bcrypt password from db by username
  const bcryptPwd = await new Promise((resolve, reject) => {
    const sql = `SELECT password FROM user where username='${loginInfo.username}';`;
    db.query(sql, (err, result) => {
      if (err) return;
      const [user] = JSON.parse(JSON.stringify(result));
      resolve(user.password);
    });
  });
  // 3. compareSync(明文密码 => 用户输入的密码，密文密码 => 数据库中存储的密文密码)
  // bcrypt就是一种不可逆的加密算法，无法通过解密密文得到明文
  const isSame = bcrypt.compareSync(password, bcryptPwd);
  if (isSame) {
    // 生成 jwt 令牌，去掉敏感信息
    const payload = { username: loginInfo.username };
    const token = jwt.sign(payload, jwtCfg.jwtSecretKey, {
      expiresIn: "2h",
    });
    res.json(resData(true, 200, "success!", token));
  } else {
    // 用户名密码校验失败
    res.json(resData(false, 610, "username or password is incorrect!"));
  }
};

exports.getRuleSetting = (req, res) => {
  const rulesSetting = {
    isEnabled: 2,
    enableHours: 1,
    isExpire: 2,
    expireDays: 2,
    isRemind: 2,
    pointsRules: {
      standardMoney: 3,
      paidMondy: 4,
      getPoints: 5,
      maxPoints: 6,
    },
    isDeduction: 2,
  };
  res.json({
    result: true,
    code: 200,
    data: rulesSetting,
    msg: "success!",
  });
};
