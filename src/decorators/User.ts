import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((data, ctx: ExecutionContext) => {
  return (ctx.switchToHttp().getRequest()?.userId as string) || '';
});
