import { FakeSensorRepository } from '@modules/sensor/repositories/fakes/FakeSensorRepository';
import { ISensorRepository } from '@modules/sensor/repositories/ISensorRepository';
import { UpdateSensorService } from "@modules/sensor/services/UpdateSensorService";

describe('Update sensor service test', () => {
  let updateSensorService: UpdateSensorService;

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
      }
    ]);

    updateSensorService = new UpdateSensorService(fakeSensorRepository);
  });

  it('Should be able to update a sensor', async () => {
    const [sensorToUpdate] = await fakeSensorRepository.findAll();

    sensorToUpdate.name = 'Test5';
    sensorToUpdate.description = 'Test5';
    sensorToUpdate.temperature = 'Test5';

    await updateSensorService.execute(sensorToUpdate);

    const [foundSensor] = await fakeSensorRepository.findByUserId('Test1');

    expect(foundSensor).toEqual(sensorToUpdate);
  });
});
