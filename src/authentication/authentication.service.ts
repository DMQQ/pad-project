import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from './authentication.entity';
import { Repository } from 'typeorm';

import * as b from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>,
  ) {}

  findAccount(email?: string, accountId?: string) {
    return this.accountRepository.findOne({
      where: { ...(email && { email }), ...(accountId && { accountId }) },
      select: ['accountId', 'email', 'password'],
    });
  }

  createAccount(props: { email: string; password: string }) {
    return this.accountRepository.save(props);
  }

  hashPassword(original: string) {
    return b.hash(original, 10);
  }

  checkPassword(original: string, hashed: string) {
    return b.compare(original, hashed);
  }

  createJWT<T extends {}>(props: T) {
    return jwt.sign(props, 'SUPER-SECRET-HASH-TOKEN');
  }

  async verifyJWT<T>(token: string): Promise<T> {
    let output;
    try {
      output = jwt.verify(token, 'SUPER-SECRET-HASH-TOKEN');
    } catch (error) {
      throw new Error(error.message);
    }

    return output;
  }
}
