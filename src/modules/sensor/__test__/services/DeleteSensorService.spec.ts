import { FakeSensorRepository } from '@modules/sensor/repositories/fakes/FakeSensorRepository';
import { ISensorRepository } from '@modules/sensor/repositories/ISensorRepository';
import { DeleteSensorService } from "@modules/sensor/services/DeleteSensorService";

describe('Delete sensor service test', () => {
  let deleteSensorService: DeleteSensorService;

  let fakeSensorRepository: ISensorRepository;

  beforeAll(() => {
    fakeSensorRepository = new FakeSensorRepository([
      {
        name: 'Test1',
        description: 'Test1',
        temperature: 'Test1',
        user_id: 'Test1',
      },
      {
        name: 'Test2',
        description: 'Test2',
        temperature: 'Test2',
        user_id: 'Test2',
      }]);

    deleteSensorService = new DeleteSensorService(fakeSensorRepository);
  });

  it('Should be able to delete a sensor', async () => {
    const [sensorToDelete] = await fakeSensorRepository.findAll();

    await deleteSensorService.execute(sensorToDelete.id);

    const foundSensor = await fakeSensorRepository.findByUserId(sensorToDelete.user_id);

    expect(foundSensor).toEqual([]);
  });
});
