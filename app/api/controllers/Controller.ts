import User from '../models/User.ts';

export default class Controller {

  // 使用中间件
  useMiddleware(middlewares: Array<Function>): void {
    const thisProperty = Object.getPrototypeOf(this);
    const thisFunctionNames = Object.getOwnPropertyNames(thisProperty);

    // 重写子类的所有方法(除 constructor 外), 并绑定中间件和模型, 中间件运行完毕后,才会运行子类中的方法
    thisFunctionNames.filter(v => v !== 'constructor').map(v => {
      const thisFunction = thisProperty[v];

      thisProperty[v] = async (context: any) => {
        try {
          // 如果中间件执行成功
          const middlewareResult = await this.exucuteMiddleware(middlewares, context);

          // 则执行子类中的方法,
          await thisFunction(context);
        } catch(err) {

          // 否则抛出异常
          context.throw(err);
        }
      }
    })
  }

  exucuteMiddleware(middleware: Array<Function>, context: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      async function iterator(index: number): Promise<void> {
        // 所有中间件执行完毕，且无异常时，Promise 状态设为 resolved
        if (index === middleware.length) {
          return resolve(true);
        }
        try {
          middleware[index].call(this, context, () => {
            iterator.call(this, ++index);
          })
        } catch(err) {
          // 执行中间件出现错误时，抛出异常
          return reject(err);
        }
      }

      iterator.call(this, 0);
    });
  }
}
