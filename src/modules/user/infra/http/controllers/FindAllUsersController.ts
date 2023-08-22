import { FindAllUsersService } from "@modules/user/services/FindAllUsersService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class FindAllUsersController {
  async handle(request: Request, response: Response): Promise<Response>{
    const findAllUsersService = container.resolve(FindAllUsersService);

    const users = await findAllUsersService.execute();

    return response.json(users);
  }
}
