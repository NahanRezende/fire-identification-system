import { User } from '@modules/user/infra/typeorm/entities/User';
import { FindAllUsersService } from '@modules/user/services/FindAllUsersService';
import { app } from '@shared/infra/http/app';
import request from 'supertest';

jest.mock('@modules/user/services/FindAllUsersService');
const findAllUsersService = FindAllUsersService as jest.MockedClass<
  typeof FindAllUsersService
>;

describe('Find all users controller test', () => {
  beforeEach(() => {
    findAllUsersService.mockClear();
  });

  it('Should be able to find all users', async () => {
    const user1 = new User();
    const user2 = new User();

    await findAllUsersService.prototype.execute.mockResolvedValueOnce(
      [user1, user2]
    );

    const response = await request(app)
      .get(`/user/`)
      .send();

    expect(response.body).toEqual([user1, user2]);
    expect(response.statusCode).toEqual(200);
  });
});
