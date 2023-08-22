import { IUserRepository } from "@modules/user/repositories/IUserRepository";
import { FakeUserRepository } from "@modules/user/repositories/fakes/FakeUserRepository";
import { UpdateUserService } from "@modules/user/services/UpdateUserService";

describe('Update user service test', () => {
  let updateUserService: UpdateUserService;

  let fakeUserRepository: IUserRepository;

  beforeAll(() => {
    fakeUserRepository = new FakeUserRepository([
      {
        name: 'Test1',
        password: 'Test1',
        email: 'Test1',
      },
      {
        name: 'Test2',
        password: 'Test2',
        email: 'Test2',
      }]);

    updateUserService = new UpdateUserService(fakeUserRepository);
  });

  it('Should be able to update a user', async () => {
    const [userToUpdate] = await fakeUserRepository.findAll();

    userToUpdate.name = 'Test5';
    userToUpdate.password = 'Test5';
    userToUpdate.email = 'Test5';

    await updateUserService.execute(userToUpdate);

    const foundUser = await fakeUserRepository.findUserById(userToUpdate.id);

    expect(foundUser).toEqual(userToUpdate);
  });
});
