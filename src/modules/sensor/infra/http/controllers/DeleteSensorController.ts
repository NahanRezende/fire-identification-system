import { DeleteSensorService } from "@modules/sensor/services/DeleteSensorService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class DeleteSensorController {
  async handle(request: Request, response: Response): Promise<Response>{
    const { sensor_id } = request.params;

    const deleteSensorService = container.resolve(DeleteSensorService);

    await deleteSensorService.execute(sensor_id);

    return response.status(200).send();
  }
}
