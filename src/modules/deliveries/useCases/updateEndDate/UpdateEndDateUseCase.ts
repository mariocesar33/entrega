import { prisma } from "../../../../database/prismaClient";

interface IUpdateEndDate {
  id_delivary: string;
  id_deliveryman: string;
}

export class UpdateEndDateUseCase {
  async execute({id_delivary, id_deliveryman}: IUpdateEndDate) {
    const result = await prisma.deliveries.updateMany({
      where: {
        id: id_delivary,
        id_deliveryman,
      },
      data: {
        end_at: new Date(),
      }
    });

    return result;
  }
}