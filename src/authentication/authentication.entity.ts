import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('account')
export class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  accountId: string;

  @Column({ type: 'varchar', length: '100', nullable: false })
  email: string;

  @Column({ type: 'varchar', length: '100', nullable: false, select: false })
  password: string;
}
