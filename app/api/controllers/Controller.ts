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
        // 运行中间件
        await this.exucuteMiddleware(middlewares, context, async () => {
          // 运行子类中的方法,
          await thisFunction(context);
        });
      }
    })
  }

  // 运行中间件
  exucuteMiddleware(middleware: Array<Function>, context: any, callback: Function): Promise<void> {
    return new Promise((resolve, reject) => {
      async function iterator(index: number): Promise<void> {
        if (index === middleware.length) {
          return callback && callback().then(resolve);
        }
        console.log(index);
        middleware[index].call(this, context, (err: Error) => {
          if (err) {
            return console.log('There was an error: ' + err.message);
          }
          iterator.call(this, ++index);
        })
      }
      iterator.call(this, 0);
    });
  }
}
