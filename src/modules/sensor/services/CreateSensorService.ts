import { inject, injectable } from 'tsyringe';
import { ISensorRepository } from '../repositories/ISensorRepository';
import { ICreateSensorDTO } from '../dtos/ICreateSensorDTO';
import { Sensor } from '../infra/typeorm/entities/Sensor';
import AppError from '@shared/errors/AppError';

@injectable()
export class CreateSensorService {
  constructor(
    @inject('SensorRepository')
    private sensorRepository: ISensorRepository,
  ) {}

  async execute(sensor: ICreateSensorDTO): Promise<Sensor>{
    return this.sensorRepository.create(sensor);
  }
}
