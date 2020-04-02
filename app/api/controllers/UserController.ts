import Controller from './Controller.ts';
import AuthMiddleware from '../middleware/AuthMiddleware.ts';
import User from '../models/User.ts';

class UserController extends Controller {

  constructor() {
    super();
    this.useMiddleware([AuthMiddleware]);
  }

  async getList(ctx: any) {
    const {limit = 10, page = 1, order} = ctx.query;

    const query = {
      attributes: ['id', 'name', 'email', 'photo', 'type', 'state', 'created_at', 'updated_at'],
      offset: (page - 1) * parseInt(limit, 10),
      limit: parseInt(limit, 10)
    }

    if (order) {
      const [orderName, orderType]: Array<string> = order.split(',');

      Object.defineProperty(query, 'order', {
        configurable: true,
        enumerable: true,
        value: [
          [orderName, orderType]
        ],
        writable: true
      })
    }

    const usersRequest = await User.findAndCountAll(query);

    ctx.type = 'application/json; charset=UTF-8';
    ctx.set('x-total', usersRequest.count);
    ctx.body = JSON.stringify(usersRequest.rows);
  }
}

const userController = new UserController();

export default userController;
