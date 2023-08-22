import { v4 as uuid } from 'uuid';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../infra/typeorm/entities/User';
import { IUserRepository } from '../IUserRepository';

export class FakeUserRepository implements IUserRepository {
  private fakeUserRepository: User[] = [];

  constructor(users?: ICreateUserDTO[]) {
    this.fakeUserRepository = [];

    if (users && users.length > 0) {
      const usersToCreate: User[] = users.map(user => {
        return {
          id: uuid(),
          name: user.name,
          password: user.password,
          email: user.email,
          created_at: new Date(),
          updated_at: new Date(),
        };
      });

      this.fakeUserRepository.push(...usersToCreate);
    }
  }

  async create(user: ICreateUserDTO): Promise<User> {
    const userToCreate = new User();

    Object.assign(userToCreate, {
      id: uuid(),
      name: user.name,
      password: user.password,
      email: user.email,
    });

    this.fakeUserRepository.push(userToCreate);

    return userToCreate;
  }

  async update(user: User): Promise<User> {
    const index = this.fakeUserRepository.findIndex(
      userToUpdate => userToUpdate.id === user.id,
    );

    this.fakeUserRepository[index].name = user.name;
    this.fakeUserRepository[index].password = user.password;
    this.fakeUserRepository[index].email = user.email;
    this.fakeUserRepository[index].updated_at = new Date();

    return this.fakeUserRepository[index];
  }

  async delete(user_id: string): Promise<void> {
    const index = this.fakeUserRepository.findIndex(
      userToDelete => userToDelete.id === user_id,
    );

    this.fakeUserRepository.splice(index, 1);
  }

  async findUserById(user_id: string): Promise<User> {
    const index = this.fakeUserRepository.findIndex(
      user => user.id === user_id,
    );

    return this.fakeUserRepository[index];
  }

  async findAll(): Promise<User[]> {
    return this.fakeUserRepository;
  }
}
