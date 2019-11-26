import Router from 'koa-router';

import User from './models/User.ts';
import UserController from './controllers/UserController.ts';
import AuthController from './controllers/AuthController.ts';











/*****************************************
                api 路由
*****************************************/

const api = new Router();

// 登陆和注册
api.get('/login', AuthController.Login);
api.get('/logout', AuthController.Logout);


// 用户列表
const user = new Router();

// 获取用户列表
user.get('/', UserController.getList)

// 获取单个用户
.get('/:id', async (ctx) => {
  const userRequest = await User.findAll({
    attributes: ['id', 'name', 'email'],
    where: {
      id: ctx.params.id
    }
  });
  ctx.body = JSON.stringify(userRequest[0]);
});

api.use('/user', user.routes(), user.allowedMethods());





// 根路由
const router = new Router();
router.use('/api', api.routes(), api.allowedMethods());


export default router;
