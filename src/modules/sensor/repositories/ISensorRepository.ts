import { ICreateSensorDTO } from "../dtos/ICreateSensorDTO";
import { Sensor } from "../infra/typeorm/entities/Sensor";

export interface ISensorRepository {
  create(sensor_scheduling: ICreateSensorDTO): Promise<Sensor>;
  update(sensor_scheduling: Sensor): Promise<Sensor>;
  delete(sensor_id: string): Promise<void>;
  findAll(): Promise<Sensor[]>;
  findByUserId(user_id: string): Promise<Sensor[]>;
}
