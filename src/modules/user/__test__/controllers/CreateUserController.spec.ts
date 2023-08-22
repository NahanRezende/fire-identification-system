import { Sensor } from '@modules/sensor/infra/typeorm/entities/Sensor';
import { CreateSensorService } from '@modules/sensor/services/CreateSensorService';
import { app } from '@shared/infra/http/app';
import request from 'supertest';

jest.mock('@modules/sensor/services/CreateSensorService');
const createSensorService = CreateSensorService as jest.MockedClass<
  typeof CreateSensorService
>;

describe('Create sensor controller test', () => {
  beforeEach(() => {
    createSensorService.mockClear();
  });

  it('Should be able to create a sensor', async () => {
    const sensor = new Sensor();

    await createSensorService.prototype.execute.mockResolvedValueOnce(
      sensor,
    );

    const response = await request(app)
      .post(`/sensor/`)
      .send({
        name: 'Test1',
        temperature: 'Test1',
        description: 'Test1',
        user_id: 'Test1',
      });

    expect(response.body).toEqual(sensor);
    expect(response.statusCode).toEqual(200);
    expect(createSensorService.prototype.execute).toHaveBeenCalledWith(
      {
        name: 'Test1',
        temperature: 'Test1',
        description: 'Test1',
        user_id: 'Test1',
      }
    );
  });
});
