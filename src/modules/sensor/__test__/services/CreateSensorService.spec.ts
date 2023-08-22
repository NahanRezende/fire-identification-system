import { ICreateSensorDTO } from '@modules/sensor/dtos/ICreateSensorDTO';
import { FakeSensorRepository } from '@modules/sensor/repositories/fakes/FakeSensorRepository';
import { ISensorRepository } from '@modules/sensor/repositories/ISensorRepository';
import { CreateSensorService } from '@modules/sensor/services/CreateSensorService';

describe('Create sensor service test', () => {
  let createSensorService: CreateSensorService;

  let fakeSensorRepository: ISensorRepository;

  beforeAll(() => {
    fakeSensorRepository = new FakeSensorRepository();

    createSensorService = new CreateSensorService(fakeSensorRepository);
  });

  it('Should be able to create a sensor', async () => {
    const sensor: ICreateSensorDTO = {
      name: 'Test1',
      description: 'Test1',
      temperature: 'Test1',
      user_id: 'Test1',
    }
    const foundUser = await createSensorService.execute(sensor);

    expect(sensor.name).toEqual(sensor.name);
    expect(sensor.description).toEqual(sensor.description);
    expect(sensor.temperature).toEqual(sensor.temperature);
    expect(sensor.user_id).toEqual(sensor.user_id);
  });
});
