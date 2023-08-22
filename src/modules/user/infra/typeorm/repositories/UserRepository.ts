import { Repository } from 'typeorm';
import { dataSource } from '@shared/infra/typeorm';
import { ICreateUserDTO } from '@modules/user/dtos/ICreateUserDTO';
import { User } from '../entities/User';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';

export class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = dataSource.getRepository(User);
  }

  async create(user: ICreateUserDTO): Promise<User> {
    const createdUser = this.ormRepository.create(user);

    return this.ormRepository.save(createdUser);
  }

  async update(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async findUserById(id: string): Promise<User> {
    return this.ormRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    return this.ormRepository.find();
  }
}
