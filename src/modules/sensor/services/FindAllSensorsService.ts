import { inject, injectable } from 'tsyringe';
import { ISensorRepository } from '../repositories/ISensorRepository';
import { Sensor } from '../infra/typeorm/entities/Sensor';

@injectable()
export class FindAllSensorsService {
  constructor(
    @inject('SensorRepository')
    private sensorRepository: ISensorRepository,
  ) {}

  async execute(): Promise<Sensor[]>{
    return this.sensorRepository.findAll();
  }
}
