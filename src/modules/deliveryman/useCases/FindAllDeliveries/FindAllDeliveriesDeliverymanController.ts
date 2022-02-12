import { Request, Response } from "express";

import { FindAllDeliveriesDeliverymanUseCase } from "./FindAllDeliveriesDeliverymanUseCase";

export class FindAllDeliveriesDeliverymanController {
  async handle(request: Request, response: Response) {
    const { id_deliveryman } = request.body;

    const findAllDeliveriesDeliverymanCaseUse = new FindAllDeliveriesDeliverymanUseCase();
    
    const result = await findAllDeliveriesDeliverymanCaseUse.execute(id_deliveryman);

    return response.status(201).json(result);
  }
}