import { Sensor } from "@modules/sensor/infra/typeorm/entities/Sensor";

export interface IMailProvider {
  sendMail(
    to: string,
    sensor: Sensor,
  ): Promise<void>;
}
