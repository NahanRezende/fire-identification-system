import { ICreateUserDTO } from '@modules/user/dtos/ICreateUserDTO';
import { FakeUserRepository } from '@modules/user/repositories/fakes/FakeUserRepository';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { CreateUserService } from '@modules/user/services/CreateUserService';

describe('Create user service test', () => {
  let createUserService: CreateUserService;

  let fakeUserRepository: IUserRepository;

  beforeAll(() => {
    fakeUserRepository = new FakeUserRepository();

    createUserService = new CreateUserService(fakeUserRepository);
  });

  it('Should be able to create a user', async () => {
    const user: ICreateUserDTO = {
      name: 'Test1',
      password: 'Test1',
      email: 'Test1',
    }
    const foundUser = await createUserService.execute(user);

    expect(foundUser.name).toEqual(user.name);
    expect(foundUser.password).toEqual(user.password);
    expect(foundUser.email).toEqual(user.email);
  });
});
