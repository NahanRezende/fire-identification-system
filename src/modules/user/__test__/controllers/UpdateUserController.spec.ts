import { User } from '@modules/user/infra/typeorm/entities/User';
import { UpdateUserService } from '@modules/user/services/UpdateUserService';
import { app } from '@shared/infra/http/app';
import request from 'supertest';

jest.mock('@modules/user/services/UpdateUserService');
const updateUserService = UpdateUserService as jest.MockedClass<
  typeof UpdateUserService
>;

describe('Update user controller test', () => {
  beforeEach(() => {
    updateUserService.mockClear();
  });

  it('Should be able to update a user', async () => {
    const user = new User();

    await updateUserService.prototype.execute.mockResolvedValueOnce(
      user,
    );

    const response = await request(app)
      .put(`/user/`)
      .send(user);

    expect(response.body).toEqual(user);
    expect(response.statusCode).toEqual(200);
    expect(updateUserService.prototype.execute).toHaveBeenCalledWith(user);
  });
});
