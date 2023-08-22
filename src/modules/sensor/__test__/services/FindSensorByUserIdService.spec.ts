import { FakeSensorRepository } from '@modules/sensor/repositories/fakes/FakeSensorRepository';
import { ISensorRepository } from '@modules/sensor/repositories/ISensorRepository';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { FakeUserRepository } from '@modules/user/repositories/fakes/FakeUserRepository';
import { FindSensorByUserIdService } from "@modules/sensor/services/FindSensorByUserIdService";
import { FindUserByIdService } from '@modules/user/services/FindUserByIdService';

describe('Find sensor by user id service test', () => {
  let findSensorByUserIdService: FindSensorByUserIdService;

  let fakeSensorRepository: ISensorRepository;

  let fakeUserRepository: IUserRepository;

  beforeAll(() => {
    fakeSensorRepository = new FakeSensorRepository()

    fakeUserRepository = new FakeUserRepository();

    findSensorByUserIdService = new FindSensorByUserIdService(fakeSensorRepository);
  });

  it('Should be able to find a sensor by user id', async () => {
    const user = await fakeUserRepository.create({
      name: 'Test1',
      password: 'Test1',
      email: 'Test1',
    });

    await fakeSensorRepository.create({
        name: 'Test2',
        description: 'Test2',
        temperature: 'Test2',
        user_id: user.id,
    })


    const [sensor] = await findSensorByUserIdService.execute(user.id);

    expect(sensor.user_id).toEqual(user.id);
  });
});
