// 导入 express 模块
const express = require("express");
// 导入 cors 中间件
const cors = require("cors");
// 创建 express 的服务器实例
const app = express();
// 将 cors 注册为全局中间件，允许跨域请求
app.use(cors());
// 配置解析 application/x-www-form-urlencoded 格式的表单数据的中间件
// ！！！否则服务器无法解析post请求中的请求体body里为表单数据格式的参数
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
// 导入并注册路由模块
const userRouter = require('./router/user');
app.use('/api', userRouter);
// 调用 app.listen 方法，指定端口号并启动 web 服务器
app.listen(8080, function () {
  console.log("server is running at http://127.0.0.1:8080");
});
