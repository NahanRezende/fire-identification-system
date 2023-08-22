import { v4 as uuid } from 'uuid';
import { Sensor } from '@modules/sensor/infra/typeorm/entities/Sensor';
import { ICreateSensorDTO } from '@modules/sensor/dtos/ICreateSensorDTO';
import { User } from '@modules/user/infra/typeorm/entities/User';
import { ISensorRepository } from '../ISensorRepository';

export class FakeSensorRepository implements ISensorRepository {
  private fakeSensorRepository: Sensor[] = [];

  constructor(sensors?: ICreateSensorDTO[]) {
    this.fakeSensorRepository = [];

    if (sensors && sensors.length > 0) {
      const sensorToCreate: Sensor[] = sensors.map(sensor => {
        return {
          id: uuid(),
          created_at: new Date(),
          updated_at: new Date(),
          name: sensor.name,
          description: sensor.description,
          temperature: sensor.temperature,
          user_id: sensor.user_id,
          user: new User()
        }
      });

      this.fakeSensorRepository.push(...sensorToCreate);
    }
  }



  async create(sensor: ICreateSensorDTO): Promise<Sensor> {
    const sensorToCreate = new Sensor();

    Object.assign( sensorToCreate,{
      id: uuid(),
      name: sensor.name,
      description: sensor.description,
      user_id: sensor.user_id
    });

    this.fakeSensorRepository.push(sensorToCreate);

    return sensorToCreate;
  }

  async update(sensor: Sensor): Promise<Sensor> {
    const index = this.fakeSensorRepository.findIndex(
      sensorToUpdate => sensorToUpdate.id === sensor.id,
    );

    this.fakeSensorRepository[index].id = sensor.id;
    this.fakeSensorRepository[index].name = sensor.name;
    this.fakeSensorRepository[index].description = sensor.description;
    this.fakeSensorRepository[index].temperature = sensor.temperature;
    this.fakeSensorRepository[index].user_id = sensor.user_id;

    return this.fakeSensorRepository[index];
  }

  async delete(sensor_id: string): Promise<void>{
    const index = this.fakeSensorRepository.findIndex(
      sensorToDelete => sensorToDelete.id === sensor_id,
    );

    this.fakeSensorRepository.splice(index, 1);
  }

  async findAll(): Promise<Sensor[]> {
    return this.fakeSensorRepository;
  }

  async findByUserId(user_id: string): Promise<Sensor[]> {
    return this.fakeSensorRepository.filter(sensor => sensor.user_id === user_id);
  }
}
