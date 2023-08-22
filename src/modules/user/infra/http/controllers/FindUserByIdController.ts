import { FindUserByIdService } from "@modules/user/services/FindUserByIdService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class FindUserByIdController {
  async handle(request: Request, response: Response): Promise<Response>{
    const { user_id } = request.params;

    const findUserByIdService = container.resolve(FindUserByIdService);

    const user = await findUserByIdService.execute(user_id);

    return response.json(user);
  }
}
