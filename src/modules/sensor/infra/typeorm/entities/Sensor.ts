import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { BaseEntity } from '@common/infra/typeorm/entities/BaseEntity';
import { User } from '@modules/user/infra/typeorm/entities/User';

@Entity('sensor')
export class Sensor extends BaseEntity {
  @Column()
  description: string;

  @Column({nullable: true, default: 0})
  temperature: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
