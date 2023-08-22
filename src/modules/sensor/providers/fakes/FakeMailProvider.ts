import { Sensor } from "@modules/sensor/infra/typeorm/entities/Sensor";
import { IMailProvider } from "../interface/IMailProvider";

export class FakeMailProvider implements IMailProvider {
  async sendMail(to: string, sensor: Sensor): Promise<void> {}
}
