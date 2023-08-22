import { Sensor } from '@modules/sensor/infra/typeorm/entities/Sensor';
import { FindAllSensorsService } from '@modules/sensor/services/FindAllSensorsService';
import { app } from '@shared/infra/http/app';
import request from 'supertest';

jest.mock('@modules/sensor/services/FindAllSensorsService');
const findAllSensorsService = FindAllSensorsService as jest.MockedClass<
  typeof FindAllSensorsService
>;

describe('Find all sensors controller test', () => {
  beforeEach(() => {
    findAllSensorsService.mockClear();
  });

  it('Should be able to find all sensors', async () => {
    const sensor1 = new Sensor();
    const sensor2 = new Sensor();

    await findAllSensorsService.prototype.execute.mockResolvedValueOnce(
      [sensor1, sensor2]
    );

    const response = await request(app)
      .get(`/sensor/`)
      .send();

    expect(response.body).toEqual([sensor1, sensor2]);
    expect(response.statusCode).toEqual(200);
  });
});
