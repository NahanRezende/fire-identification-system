import { UpdateSensorService } from "@modules/sensor/services/UpdateSensorService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class UpdateSensorController {
  async handle(request: Request, response: Response): Promise<Response>{
    const sensor = request.body;

    const updateSensorService = container.resolve(UpdateSensorService);

    const updatedSensor = await updateSensorService.execute(sensor);

    return response.json(updatedSensor);
  }
}
