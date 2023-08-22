import { User } from '@modules/user/infra/typeorm/entities/User';
import { TemperatureCheckService } from '@modules/sensor/services/TemperatureCheckService';
import { app } from '@shared/infra/http/app';
import request from 'supertest';

jest.mock('@modules/sensor/services/TemperatureCheckService');
const temperatureCheckService = TemperatureCheckService as jest.MockedClass<
  typeof TemperatureCheckService
>;

describe('Temperature check controller test', () => {
  beforeEach(() => {
    temperatureCheckService.mockClear();
  });

  it('Should be able to make a temperature check', async () => {

    await temperatureCheckService.prototype.execute.mockResolvedValueOnce(
      'Test1'
    );

    const response = await request(app)
      .post(`/sensor/teperature-check`)
      .send({
        sensor_id: 'Test1',
        user_id: 'Test1',
        temperature: 'Test1',
      });

    expect(response.body).toEqual('Test1');
    expect(response.statusCode).toEqual(200);
    expect(temperatureCheckService.prototype.execute).toHaveBeenCalledWith(
      {
        sensor_id: 'Test1',
        user_id: 'Test1',
        temperature: 'Test1',
      }
    );
  });
});
