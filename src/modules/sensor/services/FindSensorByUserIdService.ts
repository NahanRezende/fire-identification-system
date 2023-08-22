import { inject, injectable } from 'tsyringe';
import { ISensorRepository } from '../repositories/ISensorRepository';
import { Sensor } from '../infra/typeorm/entities/Sensor';

@injectable()
export class FindSensorByUserIdService {
  constructor(
    @inject('SensorRepository')
    private sensorRepository: ISensorRepository,
  ) {}

 async execute(user_id: string): Promise<Sensor[]>{
  return this.sensorRepository.findByUserId(user_id);
 }
}
