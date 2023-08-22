import { CreateUserService } from "@modules/user/services/CreateUserService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response>{
    const user = request.body;

    const createUserService = container.resolve(CreateUserService);

    const createdUser = await createUserService.execute(user);

    return response.json(createdUser);
  }
}
