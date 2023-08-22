import { dataSource } from "@shared/infra/typeorm";
import { Repository } from "typeorm";
import { ICreateSensorDTO } from "@modules/sensor/dtos/ICreateSensorDTO";
import { ISensorRepository } from "@modules/sensor/repositories/ISensorRepository";
import { Sensor } from "../entities/Sensor";

export class SensorRepository implements ISensorRepository {
  private ormRepository: Repository<Sensor>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Sensor);
  }

  async create(sensor: ICreateSensorDTO): Promise<Sensor> {
    const sensorToCreate = this.ormRepository.create(sensor);

    return this.ormRepository.save(sensorToCreate);
  }

  async update(sensor: Sensor): Promise<Sensor> {
    return this.ormRepository.save(sensor);
  }

  async delete(sensor_id: string): Promise<void> {
    await this.ormRepository.delete({ id: sensor_id });
  }

  async findAll(): Promise<Sensor[]>{
    return this.ormRepository.find();
  }

  async findByUserId(user_id: string): Promise<Sensor[]>{
    return this.ormRepository.find({ where: { user_id } });
  }
}
