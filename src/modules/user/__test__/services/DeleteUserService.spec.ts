import { IUserRepository } from "@modules/user/repositories/IUserRepository";
import { FakeUserRepository } from "@modules/user/repositories/fakes/FakeUserRepository";
import { DeleteUserService } from "@modules/user/services/DeleteUserService";

describe('Delete user service test', () => {
  let deleteUserService: DeleteUserService;

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
    },
    {
      name: 'Test2',
      password: 'Test3',
      email: 'Test2',
    }]);

    deleteUserService = new DeleteUserService(fakeUserRepository);
  });

  it('Should be able to delete a user', async () => {
    const [userToDelete] = await fakeUserRepository.findAll();

    await deleteUserService.execute(userToDelete.id);

    const foundUser = await fakeUserRepository.findUserById(userToDelete.id);

    expect(foundUser).toBeUndefined();
  });
});
