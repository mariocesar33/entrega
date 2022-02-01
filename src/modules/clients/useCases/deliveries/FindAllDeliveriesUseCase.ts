import { prisma } from "../../../../database/prismaClient";

interface IFindAllDeliveries {
  id_client: string;
}

export class FindAllDeliveriesUseCase {
  async execute({id_client}: IFindAllDeliveries) {
    // const deliveries = await prisma.deliveries.findMany({
    //   where: {
    //     id_client: id_client,
    //   }
    // });

    const deliveries  = await prisma.clients.findMany({
      where: {
        id: id_client,
      },
      include: {
        deliveries: true
      }
    });

    return deliveries;
  }
}