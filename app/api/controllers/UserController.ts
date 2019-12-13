import Controller from './Controller.ts';
import AuthMiddleware from '../middleware/AuthMiddleware.ts';
import User from '../models/User.ts';

class UserController extends Controller {

  constructor() {
    super();
    this.useMiddleware([AuthMiddleware]);
  }

  async getList(ctx: any) {
    const {limit = 20, page = 1} = ctx.query;

    const usersRequest = await User.findAndCountAll({
      attributes: ['id', 'name', 'email', 'photo', 'type', 'state', 'created_at', 'updated_at'],
      offset: (page - 1) * parseInt(limit, 10),
      limit: parseInt(limit, 10)
    });

    ctx.set('x-total', usersRequest.count);
    ctx.body = JSON.stringify(usersRequest.rows);
  }
}

const userController = new UserController();

export default userController;
