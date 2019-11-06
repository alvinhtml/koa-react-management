import Koa from 'koa';
import Router from 'koa-router';

import router from './router.ts'

const app = new Koa();

// 加载路由中间件
app
  .use(router.routes())
  .use(router.allowedMethods());


app.listen(8081, () => {
    console.log('http://127.0.0.1:8081');
});
