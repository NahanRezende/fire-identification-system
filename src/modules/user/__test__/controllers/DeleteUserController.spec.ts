import { DeleteUserService } from '@modules/user/services/DeleteUserService';
import { app } from '@shared/infra/http/app';
import request from 'supertest';

jest.mock('@modules/user/services/DeleteUserService');
const deleteUserService = DeleteUserService as jest.MockedClass<
  typeof DeleteUserService
>;

describe('Delete user controller test', () => {
  beforeEach(() => {
    deleteUserService.mockClear();
  });

  it('Should be able to delete a user', async () => {
    const response = await request(app)
      .delete(`/user/test1`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(deleteUserService.prototype.execute).toHaveBeenCalledWith('test1');
  });
});
