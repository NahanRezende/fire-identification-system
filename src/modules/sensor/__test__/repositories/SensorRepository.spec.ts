import { Sensor } from '@modules/sensor/infra/typeorm/entities/Sensor';
import { SensorRepository } from '@modules/sensor/infra/typeorm/repositories/SensorRepository';
import { ISensorRepository } from '@modules/sensor/repositories/ISensorRepository';
import { dataSource } from '@shared/infra/typeorm';
import {  Driver, Repository } from 'typeorm';
import { User } from '@modules/user/infra/typeorm/entities/User';

describe('Sensor repository test', () => {
  let ormSensorRepository: Repository<Sensor>;
  let ormUserRepository: Repository<User>;

  let sensorRepository: ISensorRepository;

  beforeAll(async () => {
    ormSensorRepository = dataSource.getRepository(Sensor);
    ormUserRepository = dataSource.getRepository(User);

    sensorRepository = new SensorRepository();
  });

  afterEach(async () => {
    await ormSensorRepository.delete({});
    await ormUserRepository.delete({});
  });

  it('Should be able to create a sensor', async () => {
    const user = await ormUserRepository.save({ name: 'teste1', email: 'teste1', password: 'teste1' });

    const sensor = {
      name: 'test1',
      description: 'test1',
      temperature: 'test1',
      user_id: user.id,
    };

    const sensorCreated = await sensorRepository.create(sensor);

    expect(sensorCreated).toBeInstanceOf(Sensor);
    expect(sensorCreated.name).toEqual(sensor.name);
    expect(sensorCreated.description).toEqual(sensor.description);
    expect(sensorCreated.temperature).toEqual(sensor.temperature);
    expect(sensorCreated.user_id).toEqual(sensor.user_id);
  });

  it('Should be able to update a sensor', async () => {
    const user = await ormUserRepository.save({ name: 'teste1', email: 'teste1', password: 'teste1' });

    const sensor = {
      name: 'test1',
      description: 'test1',
      temperature: 'test1',
      user_id: user.id,
    };

    const sensorCreated = await sensorRepository.create(sensor);

    sensorCreated.temperature = 'test2';

    const sensorUpdated = await sensorRepository.update(sensorCreated);

    expect(sensorUpdated.id).toEqual(sensorCreated.id);
    expect(sensorUpdated.temperature).toEqual('test2');
  });

  it('Should be able to find a sensor by user id', async () => {
    const user = await ormUserRepository.save({ name: 'teste1', email: 'teste1', password: 'teste1' });

    const sensor = {
      name: 'test1',
      description: 'test1',
      temperature: 'test1',
      user_id: user.id,
    };

    const sensorCreated = await sensorRepository.create(sensor);

    const [foundSensor] = await sensorRepository.findByUserId(user.id);

    expect(sensorCreated).toEqual(foundSensor);
  });

  it('Should be able to find all sensors', async () => {
    const user = await ormUserRepository.save({ name: 'teste1', email: 'teste1', password: 'teste1' });

    const sensor = {
      name: 'test1',
      description: 'test1',
      temperature: 'test1',
      user_id: user.id,
    };

    const sensorCreated = await sensorRepository.create(sensor);

    const foundSensor = await sensorRepository.findAll();

    expect(foundSensor.length).toEqual(1);
    expect(foundSensor[0]).toEqual(sensorCreated);
  });

  it('Should be able to delete a sensor', async () => {
    const user = await ormUserRepository.save({ name: 'teste1', email: 'teste1', password: 'teste1' });

    const sensor = {
      name: 'test1',
      description: 'test1',
      temperature: 'test1',
      user_id: user.id,
    };

    const sensorCreated = await sensorRepository.create(sensor);

    await sensorRepository.delete(sensorCreated.id);

    const foundSensor = await sensorRepository.findAll();

    expect(foundSensor).toEqual([]);
  });
});
