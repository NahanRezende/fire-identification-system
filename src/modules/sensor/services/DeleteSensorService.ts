import { inject, injectable } from 'tsyringe';
import { ISensorRepository } from '../repositories/ISensorRepository';

@injectable()
export class DeleteSensorService {
  constructor(
    @inject('SensorRepository')
    private sensorRepository: ISensorRepository,
  ) {}

  async execute(sensor_id: string): Promise<void>{
    await this.sensorRepository.delete(sensor_id);
  }
}
