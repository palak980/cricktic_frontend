// setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // Proxy requests to your backend server
  app.use(
    '/cricinfo', // Specify the path you want to proxy
    createProxyMiddleware({
      target: 'http://103.209.146.149', // URL of your backend server
      changeOrigin: true,
    })
  );
};
