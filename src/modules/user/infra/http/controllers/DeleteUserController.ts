import { DeleteUserService } from "@modules/user/services/DeleteUserService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class DeleteUserController {
  async handle(request: Request, response: Response): Promise<Response>{
    const { user_id } = request.params;

    const deleteUserService = container.resolve(DeleteUserService);

    await deleteUserService.execute(user_id);

    return response.status(200).send();
  }
}
