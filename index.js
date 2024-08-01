const http = require('http');
const express = require('express');
const httpProxy = require('http-proxy');

// 创建一个代理对象
const proxy = httpProxy.createProxyServer();

// 目标服务器地址
const targetServer = 'http://8.134.204.164:8090';

// 创建一个简单的 Express 应用
const app = express();

// 创建一个简单的 HTTP 服务器
const server = http.createServer(app);

// 转发请求到目标服务器
app.all('*', (req, res) => {
  proxy.web(req, res, { target: targetServer });
});

// 错误处理
proxy.on('error', (err, req, res) => {
  res.writeHead(500, { 'Content-Type': 'text/plain' });
  res.end('An error occurred while forwarding the request.');
});

// 监听端口
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
});