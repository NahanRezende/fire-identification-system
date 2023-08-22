import { UpdateUserService } from "@modules/user/services/UpdateUserService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response>{
    const user = request.body;

    const updateUserService = container.resolve(UpdateUserService);

    const updatedUser = await updateUserService.execute(user);

    return response.json(updatedUser);
  }
}
