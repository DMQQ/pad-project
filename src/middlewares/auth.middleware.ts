import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AuthenticationService } from 'src/authentication/authentication.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthenticationService) {}

  async use(
    req: Request & { userId: string },
    res: Response,
    next: NextFunction,
  ) {
    const token = req.headers?.['authentication'] as string;

    try {
      const result = await this.authService.verifyJWT<{
        accountId: string;
        email: string;
      }>(token);

      console.log(result);

      req.userId = result?.accountId;

      next();
    } catch (error) {
      // res.clearCookie('authentication');

      console.log({ token });

      console.log(error);

      next();

      // res.status(401).send({
      //   error: 'Invalid cookie signature, sign again',
      //   statusCode: 401,
      // });
    }
  }
}
