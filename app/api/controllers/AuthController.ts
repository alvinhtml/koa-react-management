import bcrypt from 'bcryptjs';
import Controller from './Controller.ts';
import AuthMiddleware from '../middleware/AuthMiddleware.ts';
import User from '../models/User.ts';

const saltRounds = 10;

class AuthController extends Controller {

  constructor() {
    super();
  }

  async Login(ctx: any) {

    const {email, password} = ctx.query;

    const usersRequest = await User.findOne({
      where: {
        email
      }
    });

    if (usersRequest) {
      // As of bcryptjs 2.4.0, compare returns a promise if callback is omitted
      const compareResult = await bcrypt.compare(password, usersRequest.password);

      if (compareResult) {
        ctx.session.id = usersRequest.id;
        ctx.session.name = usersRequest.name;
        ctx.session.email = usersRequest.email;
        ctx.session.logined = true;

        usersRequest.password = undefined;
        usersRequest.remember_token = undefined;

        ctx.body = JSON.stringify({
          message: 'logined !',
          data: ctx.session
        });

      } else {
        ctx.throw(401, 'password error.');
      }
    } else {
      ctx.throw(404, 'user name does not exist.');
    }

  }

  async Logout(ctx: any) {
    ctx.session.id = undefined;
    ctx.session.name = undefined;
    ctx.session.email = undefined;
    ctx.session.logined = false;

    ctx.body = JSON.stringify({
      message: 'logout!'
    });
  }

  async register(ctx: any) {
    const {name, email, password} = ctx.query;


    const usersRequest = await User.findOne({
      where: {
        email
      }
    });

    if (usersRequest) {
      ctx.throw(403, 'Email already exists.');
    } else {
      const hash = await bcrypt.hash(password, 10);

      const createRequest = await User.create({
        name,
        email,
        password: hash,
        photo: '',
        type: 1,
        state: 1,
        remember_token: ''
      });

      ctx.body = JSON.stringify({
        message: 'Registered !',
        data: createRequest
      });
    }
  }

}

const userController = new AuthController();

export default userController;
