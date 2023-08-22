import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../infra/typeorm/entities/User';

export interface IUserRepository {
  create(user: ICreateUserDTO): Promise<User>;
  update(user: User): Promise<User>;
  delete(user_id: string): Promise<void>;
  findUserById(user_id: string): Promise<User>;
  findAll(): Promise<User[]>;
}
