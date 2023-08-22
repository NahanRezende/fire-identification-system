import { IUserRepository } from "@modules/user/repositories/IUserRepository";
import { FakeUserRepository } from "@modules/user/repositories/fakes/FakeUserRepository";
import { FindUserByIdService } from "@modules/user/services/FindUserByIdService";

describe('Find user by id service test', () => {
  let findUserByIdService: FindUserByIdService;

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

    findUserByIdService = new FindUserByIdService(fakeUserRepository);
  });

  it('Should be able to find a user by id', async () => {
    const [userToFound] = await fakeUserRepository.findAll();

    const foundUser = await findUserByIdService.execute(userToFound.id);

    expect(foundUser.id).toEqual(userToFound.id);
  });
});
