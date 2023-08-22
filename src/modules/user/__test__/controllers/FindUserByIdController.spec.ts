import { User } from '@modules/user/infra/typeorm/entities/User';
import { FindUserByIdService } from '@modules/user/services/FindUserByIdService';
import { app } from '@shared/infra/http/app';
import request from 'supertest';

jest.mock('@modules/user/services/FindUserByIdService');
const findUserByIdService = FindUserByIdService as jest.MockedClass<
  typeof FindUserByIdService
>;

describe('Find user by id controller test', () => {
  beforeEach(() => {
    findUserByIdService.mockClear();
  });

  it('Should be able to find a user by id', async () => {
    const user = new User();

    await findUserByIdService.prototype.execute.mockResolvedValueOnce(
      user
    );

    const response = await request(app)
      .get(`/user/test1`)
      .send();

    expect(response.body).toEqual(user);
    expect(response.statusCode).toEqual(200);
    expect(findUserByIdService.prototype.execute).toHaveBeenCalledWith('test1');
  });
});
