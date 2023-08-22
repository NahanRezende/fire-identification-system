import {
  Column,
  Entity,
} from 'typeorm';
import { BaseEntity } from '@common/infra/typeorm/entities/BaseEntity'

@Entity('user')
export class User extends BaseEntity {
  @Column()
  password: string;

  @Column()
  email: string;
}
