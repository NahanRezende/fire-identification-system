import { DeleteSensorService } from '@modules/sensor/services/DeleteSensorService';
import { app } from '@shared/infra/http/app';
import request from 'supertest';

jest.mock('@modules/sensor/services/DeleteSensorService');
const deleteSensorService = DeleteSensorService as jest.MockedClass<
  typeof DeleteSensorService
>;

describe('Delete sensor controller test', () => {
  beforeEach(() => {
    deleteSensorService.mockClear();
  });

  it('Should be able to delete a sensor', async () => {
    const response = await request(app)
      .delete(`/sensor/test1`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(deleteSensorService.prototype.execute).toHaveBeenCalledWith('test1');
  });
});
