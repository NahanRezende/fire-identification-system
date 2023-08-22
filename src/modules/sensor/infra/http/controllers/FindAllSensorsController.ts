import { FindAllSensorsService } from "@modules/sensor/services/FindAllSensorsService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class FindAllSensorsController {
  async handle(request: Request, response: Response): Promise<Response>{
    const findAllSensorsService = container.resolve(FindAllSensorsService);

    const sensors = await findAllSensorsService.execute();

    return response.json(sensors);
  }
}
