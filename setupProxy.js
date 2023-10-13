const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  console.log("Proxy middleware is running");

  app.use(
    '/cricinfo', // Specify the path you want to proxy
    createProxyMiddleware({
      target: 'http://103.209.146.149', // URL of your backend server
      changeOrigin: true,
    })
  );
};
