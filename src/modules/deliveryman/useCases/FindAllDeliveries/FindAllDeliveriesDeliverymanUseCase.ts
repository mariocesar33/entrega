import { prisma } from "../../../../database/prismaClient";

export class FindAllDeliveriesDeliverymanUseCase {
  async execute() {
    const findAllDeliveries = prisma.deliveries.findMany();

    return findAllDeliveries;
  }
}