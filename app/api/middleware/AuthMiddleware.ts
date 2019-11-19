export default function AuthMiddleware(ctx: any, next: Function): void {

  // 登录验证逻辑
  ctx.logined = true;

  next();
}
