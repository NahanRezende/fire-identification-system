import { User } from '@modules/user/infra/typeorm/entities/User';
import { UserRepository } from '@modules/user/infra/typeorm/repositories/UserRepository';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { dataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';

describe('User repository test', () => {
  let ormUsersRepository: Repository<User>;

  let userRepository: IUserRepository;

  beforeAll(async () => {
    ormUsersRepository = dataSource.getRepository(User);

    userRepository = new UserRepository();
  });

  beforeEach(async () => {
    await ormUsersRepository.save([
      {
        name: 'Test1',
        password: 'Test1',
        email: 'Test1',
      },
      {
        name: 'Test2',
        password: 'Test2',
        email: 'Test2',
      },
    ]);
  });

  afterEach(async () => {
    await ormUsersRepository.delete({});
  });

  it('Should be able to create a user', async () => {
    const user = {
      name: 'Test1',
      password: 'Test1',
      email: 'Test1',
    };

    const userCreated = await userRepository.create(user);

    const foundUser = await userRepository.findUserById(userCreated.id);

    expect(userCreated).toEqual(foundUser);
  });

  it('Should be able to update a user', async () => {
    const [userToUpdate] = await userRepository.findAll();

    userToUpdate.name = 'Test3';
    userToUpdate.password = 'Test3';
    userToUpdate.email = 'Test3';

    await userRepository.update(userToUpdate);

    const foundUser = await userRepository.findUserById(userToUpdate.id);

    expect(userToUpdate).toEqual(foundUser);
  });

  it('Should be able to delete a user', async () => {
    const [userToDelete] = await userRepository.findAll();

    await userRepository.delete(userToDelete.id);

    const foundUsers = await userRepository.findUserById(userToDelete.id);

    expect(foundUsers).toBeNull();
  });

  it('Should be able to find a user by id', async () => {
    const [userToFind] = await userRepository.findAll();

    const foundUser = await userRepository.findUserById(userToFind.id);

    expect(foundUser).toEqual(userToFind);
  });

  it('Should be able to find all users', async () => {
    const foundUsers = await userRepository.findAll();

    expect(foundUsers.length).toEqual(2);
  });
});
