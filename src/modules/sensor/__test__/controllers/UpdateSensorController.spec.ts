import { Sensor } from '@modules/sensor/infra/typeorm/entities/Sensor';
import { UpdateSensorService } from '@modules/sensor/services/UpdateSensorService';
import { app } from '@shared/infra/http/app';
import request from 'supertest';

jest.mock('@modules/sensor/services/UpdateSensorService');
const updateSensorService = UpdateSensorService as jest.MockedClass<
  typeof UpdateSensorService
>;

describe('Update sensor controller test', () => {
  beforeEach(() => {
    updateSensorService.mockClear();
  });

  it('Should be able to update a sensor', async () => {
    const sensor = new Sensor();

    await updateSensorService.prototype.execute.mockResolvedValueOnce(
      sensor,
    );

    const response = await request(app)
      .put(`/sensor/`)
      .send(sensor);

    expect(response.body).toEqual(sensor);
    expect(response.statusCode).toEqual(200);
    expect(updateSensorService.prototype.execute).toHaveBeenCalledWith(sensor);
  });
});
