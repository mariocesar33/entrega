import { hash } from "bcrypt";

import { prisma } from "../../../../database/prismaClient";

interface ICreateDeliveryman {
  username: string;
  password: string;
}

export class CreateDeliverymanUseCase {
  async execute({username, password}: ICreateDeliveryman) {
    // Verificar se o deliveryman existe
    const deliverymanExist = await prisma.deliveryman.findFirst({
      where: {
        username: {
          mode: "insensitive"
        }
      }
    });

    if (deliverymanExist) {
      throw new Error("Deliveryman already exists!");
    }

    // Criptografar a palavra passe
    const hashPassaword = await hash(password, 10);

    // Salvar o deliveryman no banco de dados
    const deliveryman = await prisma.deliveryman.create({
      data: {
        username,
        password: hashPassaword,
      }
    });

    return deliveryman;
  }
}