import { inject, injectable } from 'tsyringe';
import { ISensorRepository } from '../repositories/ISensorRepository';
import { Sensor } from '../infra/typeorm/entities/Sensor';

@injectable()
export class UpdateSensorService {
  constructor(
    @inject('SensorRepository')
    private sensorRepository: ISensorRepository,
  ) {}

  async execute(sensor: Sensor): Promise<Sensor>{
    return this.sensorRepository.update(sensor);
  }
}
