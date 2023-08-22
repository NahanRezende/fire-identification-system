import { CreateSensorService } from "@modules/sensor/services/CreateSensorService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class CreateSensorController {
  async handle(request: Request, response: Response): Promise<Response>{
    const sensor = request.body;

    const createSensorService = container.resolve(CreateSensorService);

    const createdSensor = await createSensorService.execute(sensor);

    return response.json(createdSensor);
  }
}
