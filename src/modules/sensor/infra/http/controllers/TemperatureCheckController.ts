import { TemperatureCheckService } from "@modules/sensor/services/TemperatureCheckService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class TemperatureCheckController {
  async handle(request: Request, response: Response): Promise<Response>{
    const { sensor_id, user_id, temperature } = request.body;

    const temperatureCheckService = container.resolve(TemperatureCheckService);

    const res = await temperatureCheckService.execute({ sensor_id, user_id, temperature });

    return response.json(res);
  }
}
