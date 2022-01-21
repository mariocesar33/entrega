import { Request, Response } from "express"; 

import { CreateDeliveryUseCase } from "./CreateDeliveryUseCase";

export class CreateDeliveryController { 
  async handle(request: Request, response: Response) {
    const { id_client, item_name } = request.body;

    const createDeleveryUseCase = new CreateDeliveryUseCase();

    const delivery = await createDeleveryUseCase.execute({
      id_client,
      item_name,
    });

    return response.json(delivery);
  }
}