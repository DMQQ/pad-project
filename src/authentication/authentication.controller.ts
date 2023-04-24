import {
  Controller,
  Post,
  Query,
  Body,
  Headers,
  Res,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { AccountInput } from './authentication.dto';
import { AuthenticationService } from './authentication.service';

@Controller('/authentication')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post('/create-account')
  async createAccount(@Body() input: AccountInput, @Res() response: Response) {
    const account = await this.authenticationService.findAccount(input.email);

    if (account)
      throw new BadRequestException('Account with given email already exist');

    const password = await this.authenticationService.hashPassword(
      input.password,
    );

    const created = await this.authenticationService.createAccount({
      email: input.email,
      password,
    });

    const token = this.authenticationService.createJWT({
      accountId: created.accountId,
      email: created.email,
    });

    response.cookie('authentication', token, {
      secure: false,
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 60),
      path: '/',
    });

    response.status(200).send({
      authenticated: true,
      email: created.email,
    });
  }

  @Post('/login')
  async loginAccount(@Body() input: AccountInput, @Res() response: Response) {
    const account = await this.authenticationService.findAccount(input.email);

    if (typeof account === 'undefined' || account === null)
      throw new BadRequestException('Account doesnt exist');

    const isPasswordValid = await this.authenticationService.checkPassword(
      input.password,
      account.password,
    );

    if (!isPasswordValid) throw new BadRequestException('Password is invalid');

    const jwt = this.authenticationService.createJWT({
      accountId: account.accountId,
      email: account.email,
    });

    response.cookie('authentication', jwt, {
      secure: false,
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 60),
      path: '/',
    });

    response.status(200).send({
      authenticated: true,
      email: account.email,
    });
  }
}
