import { FakeSensorRepository } from '@modules/sensor/repositories/fakes/FakeSensorRepository';
import { ISensorRepository } from '@modules/sensor/repositories/ISensorRepository';
import { FakeUserRepository } from '@modules/user/repositories/fakes/FakeUserRepository';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { TemperatureCheckService } from '@modules/sensor/services/TemperatureCheckService';
import { IMailProvider } from '@modules/sensor/providers/interface/IMailProvider';
import { FakeMailProvider } from '@modules/sensor/providers/fakes/FakeMailProvider';


describe('Temperature Check service test', () => {
  let temperatureCheckService: TemperatureCheckService;

  let fakeSensorRepository: ISensorRepository;
  let fakeUserRepository: IUserRepository;
  let fakeMailProvider: IMailProvider;

  beforeAll(() => {
    fakeSensorRepository = new FakeSensorRepository();
    fakeUserRepository = new FakeUserRepository();
    fakeMailProvider = new FakeMailProvider();

    temperatureCheckService = new TemperatureCheckService(fakeMailProvider, fakeSensorRepository, fakeUserRepository);
  });

  it('Should not be able to find a user with user id', async () => {
    const temperatureCheck = await temperatureCheckService.execute({user_id: 'Teste1', sensor_id: 'Teste1', temperature: '100'});

    expect(temperatureCheck).toEqual(`Unable to find user for this id: Teste1`);
  });

  it('Should not be able to find a sensor with user id', async () => {
    const user = await fakeUserRepository.create({
      name: 'Test1',
      password: 'Test1',
      email: 'Test1',
    })

    const temperatureCheck = await temperatureCheckService.execute({user_id: user.id, sensor_id: 'Teste1', temperature: '100'});

    expect(temperatureCheck).toEqual(`Unable to find sensors for this user id: ${user.id}`);
  });

  it('Should not be able to find a sensor with sensor id', async () => {
    const user = await fakeUserRepository.create({
      name: 'Test1',
      password: 'Test1',
      email: 'Test1',
    })

    await fakeSensorRepository.create({
      name: 'Test1',
      description: 'Test1',
      temperature: '200',
      user_id: user.id,
    })

    const temperatureCheck = await temperatureCheckService.execute({user_id: user.id, sensor_id: 'Teste1', temperature: '100'});

    expect(temperatureCheck).toEqual(`Unable to find a sensor for this sensor id: Teste1`);
  });

  it('Should be able to check a higher temperature than 200°C', async () => {
    const user = await fakeUserRepository.create({
      name: 'Test1',
      password: 'Test1',
      email: 'Test1',
    })

    const sensor = await fakeSensorRepository.create({
      name: 'Test1',
      description: 'Test1',
      temperature: '200',
      user_id: user.id,
    })

    const temperatureCheck = await temperatureCheckService.execute({user_id: user.id, sensor_id: sensor.id, temperature: '200'});

    expect(temperatureCheck).toEqual(`Sensor: ${sensor.name} - Foi identificado um possivel foco de incêndio, temperatura aferida: ${sensor.temperature}°C`);
  });

  it('Should be able to check a smaller temperature than 200°C', async () => {
    const user = await fakeUserRepository.create({
      name: 'Test1',
      password: 'Test1',
      email: 'Test1',
    })

    const sensor = await fakeSensorRepository.create({
      name: 'Test1',
      description: 'Test1',
      temperature: '200',
      user_id: user.id,
    })

    const temperatureCheck = await temperatureCheckService.execute({user_id: user.id, sensor_id: sensor.id, temperature: '200'});

    expect(temperatureCheck).toEqual(`Sensor: ${sensor.name} - Foi identificado um possivel foco de incêndio, temperatura aferida: ${sensor.temperature}°C`);
  });
});
