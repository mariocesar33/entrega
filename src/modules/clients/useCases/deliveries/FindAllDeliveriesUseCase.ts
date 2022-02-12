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
      select: {
        deliveries: true,
        id: true,
        username: true
      }
    });

    return deliveries;
  }
}