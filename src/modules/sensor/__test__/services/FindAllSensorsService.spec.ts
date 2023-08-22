import { FakeSensorRepository } from '@modules/sensor/repositories/fakes/FakeSensorRepository';
import { ISensorRepository } from '@modules/sensor/repositories/ISensorRepository';
import { FindAllSensorsService } from '@modules/sensor/services/FindAllSensorsService';


describe('Find all sensors service test', () => {
  let findAllSensorsService: FindAllSensorsService;

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

    findAllSensorsService = new FindAllSensorsService(fakeSensorRepository);
  });

  it('Should be able to find all sensor', async () => {
    const foundSensors = await findAllSensorsService.execute();

    expect(foundSensors.length).toEqual(2);
  });
});
