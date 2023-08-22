import { Sensor } from '@modules/sensor/infra/typeorm/entities/Sensor';
import { User } from '@modules/user/infra/typeorm/entities/User';
import { CreateUserService } from '@modules/user/services/CreateUserService';
import { app } from '@shared/infra/http/app';
import request from 'supertest';

jest.mock('@modules/user/services/CreateUserService');
const createUserService = CreateUserService as jest.MockedClass<
  typeof CreateUserService
>;

describe('Create user controller test', () => {
  beforeEach(() => {
    createUserService.mockClear();
  });

  it('Should be able to create a user', async () => {
    const user = new User();

    await createUserService.prototype.execute.mockResolvedValueOnce(
      user,
    );

    const response = await request(app)
      .post(`/user/`)
      .send({
        name: 'Teste1',
        password: 'Teste1',
        email: 'Teste1',
      });

    expect(response.body).toEqual(user);
    expect(response.statusCode).toEqual(200);
    expect(createUserService.prototype.execute).toHaveBeenCalledWith(
      {
        name: 'Teste1',
        password: 'Teste1',
        email: 'Teste1',
      }
    );
  });
});
