import Router from 'koa-router';
import User from './models/User.ts';

const user = new Router();

// 获取用户列表
user.get('/', async (ctx) => {
  const usersRequest = await User.findAll({
    attributes: ['id', 'name', 'email']
  });
  ctx.body = JSON.stringify(usersRequest);
})

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


// api 路由
const api = new Router();
api.use('/user', user.routes(), user.allowedMethods());

// 根路由
const router = new Router();
router.use('/api', api.routes(), api.allowedMethods());


export default router;
