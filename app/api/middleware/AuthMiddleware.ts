export default function AuthMiddleware(ctx: any, next: Function): void {

  console.log('ctx.session.logined', ctx.session.logined)

  // 登录验证逻辑
  if (ctx.session.logined) {
    next();
  } else {
    ctx.throw(401, 'password error.');
    next(new Error('password error.'));
  }
}
