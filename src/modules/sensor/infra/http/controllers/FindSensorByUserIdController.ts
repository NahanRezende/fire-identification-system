import { FindSensorByUserIdService } from "@modules/sensor/services/FindSensorByUserIdService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class FindSensorByUserIdController {
  async handle(request: Request, response: Response): Promise<Response>{
    const { user_id } = request.params;

    const findSensorByUserIdService = container.resolve(FindSensorByUserIdService);

    const sensors = await findSensorByUserIdService.execute(user_id);

    return response.json(sensors);
  }
}
