const NodeRSA = require("node-rsa");

// 2048 密钥长度
const key = new NodeRSA({ b: 2048 });
// 指定加密格式  不改格式得话可能会报错
key.setOptions({ encryptionScheme: "pkcs1" });

exports.generatePublicKey = () => {
  // 导出公钥
  return key.exportKey("pkcs8-public-pem");
};

exports.decrypt = (password) => {
  const privateKey = key.exportKey("pkcs8-private-pem");
  // 导入私钥
  key.importKey(privateKey);
  // 解密
  return key.decrypt(password, "utf8");
};
