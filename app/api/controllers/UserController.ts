import Controller from './Controller.ts';
import AuthMiddleware from '../middleware/AuthMiddleware.ts';
import User from '../models/User.ts';

class UserController extends Controller {

  constructor() {
    super();
    this.useMiddleware([AuthMiddleware]);
  }

  async getList(ctx: any) {
    const usersRequest = await User.findAll({
      attributes: ['id', 'name', 'email', 'photo', 'type', 'state', 'created_at', 'updated_at']
    });

    ctx.body = JSON.stringify(usersRequest);
  }
}

const userController = new UserController();

export default userController;
