import { Request, Response } from "express";
import { CreateClient } from "./CreateClientUseCase";

export class CreateClientController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const createClientUseCase = new CreateClient();

    const result = await createClientUseCase.execute({
      username,
      password
    });

    return response.json(result);
  };
}