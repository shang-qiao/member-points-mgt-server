// 导入 express 模块
const express = require("express");
// 导入 cors 中间件
const cors = require("cors");
// 创建 express 的服务器实例
const app = express();
const config = require("./config/jwt");
const { generatePublicKey } = require("./utils/rsaEncrypt");
// 将 cors 注册为全局中间件，允许跨域请求
app.use(cors());
// 配置解析 application/x-www-form-urlencoded 格式的表单数据的中间件
// ！！！否则服务器无法解析post请求中的请求体body里为表单数据格式的参数
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 解析 token 的中间件
// 默认情况下，express-jwt 是从请求 Headers 的 Authorization 字段来获取 Token 并解析
// 默认解析结果会赋值在 req.user
const expressJWT = require("express-jwt");
// 使用 .unless({ path: [] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(
  expressJWT
    .expressjwt({ secret: config.jwtSecretKey, algorithms: ["HS256"] })
    .unless({ path: ["/api/login", "/api/public_key"] })
);
// 拦截器
app.use((req, res, next) => {
  const isGetPublicKey = req.url.split("/").includes("public_key");
  if (isGetPublicKey) {
    res.end(
      JSON.stringify({
        code: 200,
        data: {
          publicKey: generatePublicKey(),
        },
      })
    );
  }
  // 非获取公钥的请求，放行
  next();
});
// 导入并注册路由模块
const userRouter = require("./router/user");
app.use("/api", userRouter);
// 调用 app.listen 方法，指定端口号并启动 web 服务器
app.listen(8080, function () {
  console.log("server is running at http://127.0.0.1:8080");
});
