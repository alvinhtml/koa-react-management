import Controller from './Controller.ts';
import AuthMiddleware from '../middleware/AuthMiddleware.ts';
import User from '../models/User.ts';

class AuthController extends Controller {

  constructor() {
    super();
  }

  async Login(ctx: any) {

    const {name, password} = ctx.query;

    const usersRequest = await User.findOne({
      where: {
        email: name
      }
    });

    if (usersRequest) {
      if (password === usersRequest.password) {
        ctx.session.id = usersRequest.id;
        ctx.session.name = usersRequest.name;
        ctx.session.email = usersRequest.email;
        ctx.session.logined = true;

        ctx.body = JSON.stringify({
          message: '登录成功！',
          data: usersRequest
        });

      } else {
        ctx.throw(401, 'password error.');
      }
    } else {
      ctx.throw(404, 'user name does not exist.');
    }

  }

  async Logout(ctx: any) {
    // const usersRequest = await User.findAll({
    //   attributes: ['id', 'name', 'email', 'photo', 'type', 'state', 'created_at', 'updated_at']
    // });

    ctx.session.id = null;
    ctx.session.name = null;
    ctx.session.email = null;
    ctx.session.logined = false;

    ctx.body = JSON.stringify({
      message: '退出成功！'
    });
  }
}

const userController = new AuthController();

export default userController;
