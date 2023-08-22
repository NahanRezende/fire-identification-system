import { Sensor } from '@modules/sensor/infra/typeorm/entities/Sensor';
import { FindSensorByUserIdService } from '@modules/sensor/services/FindSensorByUserIdService';
import { app } from '@shared/infra/http/app';
import request from 'supertest';

jest.mock('@modules/sensor/services/FindSensorByUserIdService');
const findSensorByUserIdService = FindSensorByUserIdService as jest.MockedClass<
  typeof FindSensorByUserIdService
>;

describe('Find sensor by user id controller test', () => {
  beforeEach(() => {
    findSensorByUserIdService.mockClear();
  });

  it('Should be able to find a sensor by user id', async () => {
    const sensor = new Sensor();

    await findSensorByUserIdService.prototype.execute.mockResolvedValueOnce([
      sensor
    ]);

    const response = await request(app)
      .get(`/sensor/test1`)
      .send();

    expect(response.body).toEqual([sensor]);
    expect(response.statusCode).toEqual(200);
    expect(findSensorByUserIdService.prototype.execute).toHaveBeenCalledWith('test1');
  });
});
