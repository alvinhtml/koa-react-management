import Koa from 'koa';
import Router from 'koa-router';
import session from 'koa-session';

import router from './router.ts'

const app = new Koa();




const CONFIG = {
  key: 'koa:sess', /**  cookie的key。 (默认是 koa:sess) */
  maxAge: 86400000,   /**  session 过期时间，以毫秒ms为单位计算 。*/
  autoCommit: true, /** 自动提交到响应头。(默认是 true) */
  overwrite: true, /** 是否允许重写 。(默认是 true) */
  httpOnly: true, /** 是否设置HttpOnly，如果在Cookie中设置了"HttpOnly"属性，那么通过程序(JS脚本、Applet等)将无法读取到Cookie信息，这样能有效的防止XSS攻击。  (默认 true) */
  signed: true, /** 是否签名。(默认是 true) */
  rolling: true, /** 是否每次响应时刷新Session的有效期。(默认是 false) */
  renew: false, /** 是否在Session快过期时刷新Session的有效期。(默认是 false) */
};

app.keys = ['alvinhtml'];

app.use(session(CONFIG, app));


// 加载路由中间件
app
  .use(router.routes())
  .use(router.allowedMethods());


app.listen(8081, () => {
    console.log('http://127.0.0.1:8081');
});
