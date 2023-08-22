import { IUserRepository } from "@modules/user/repositories/IUserRepository";
import { FakeUserRepository } from "@modules/user/repositories/fakes/FakeUserRepository";
import { FindAllUsersService } from "@modules/user/services/FindAllUsersService";


describe('Find all users service test', () => {
  let findAllUsersService: FindAllUsersService;

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

    findAllUsersService = new FindAllUsersService(fakeUserRepository);
  });

  it('Should be able to find all users', async () => {
    const foundUsers = await findAllUsersService.execute();

    expect(foundUsers.length).toEqual(2);
  });
});
