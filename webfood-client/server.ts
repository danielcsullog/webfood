
import * as path from 'path';
import * as express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

app.use(express.static('./dist/webfood-client'));

app.use(
  '/api/users/login',
  createProxyMiddleware({
    pathRewrite: {
      '^/api': '',
    },
    target: `${process.env.TARGET}/users/login`,
    changeOrigin: true,
  })
);

app.use(
  '/api/*',
  createProxyMiddleware({
    pathRewrite: {
      '^/api': '',
    },
    target: process.env.TARGET || 'http://localhost:3000',
    changeOrigin: true,
  })
);

app.use('/*', (req, res) => {
  res.sendFile(path.resolve('./dist/webfood-client/index.html'));
});

app.listen(process.env.PORT || 4200);