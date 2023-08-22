import { inject, injectable } from "tsyringe";
import { ISensorRepository } from "../repositories/ISensorRepository";
import AppError from "@shared/errors/AppError";
import { IMailProvider } from "../providers/interface/IMailProvider";
import { IUserRepository } from "@modules/user/repositories/IUserRepository";
import { ITemperatureCheckDTO } from "../dtos/ITemperatureCheckDTO";

@injectable()
export class TemperatureCheckService {
  constructor(
    @inject('MailProvider')
    private mailProvider: IMailProvider,
    @inject('SensorRepository')
    private sensorRepository: ISensorRepository,
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({ sensor_id, user_id, temperature }: ITemperatureCheckDTO): Promise<string>{
    const user = await this.userRepository.findUserById(user_id);

    if(!user){
      return `Unable to find user for this id: ${user_id}`;
    }

    const sensors = await this.sensorRepository.findByUserId(user_id);

    if(sensors.length === 0){
      return `Unable to find sensors for this user id: ${user_id}`;
    }

    const sensor = sensors.find(sensor => sensor.id = sensor_id);

    if(!sensor){
      return `Unable to find a sensor for this sensor id: ${sensor_id}`;
    }

    if(Number(temperature) >= 200){
      sensor.temperature = temperature;

      await this.sensorRepository.update(sensor);

      await this.mailProvider.sendMail(user.email, sensor);

      return `Sensor: ${sensor.name} - Foi identificado um possivel foco de incêndio, temperatura aferida: ${sensor.temperature}°C`
    }

    sensor.temperature = temperature;

    await this.sensorRepository.update(sensor);


    return 'O sensor não aferiu temperaturas fora do normal!';
  }
}
