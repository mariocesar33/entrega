import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { prisma } from "../../../database/prismaClient";

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}

export class AuthenticateDeliverymanUseCase {
  async execute({username, password}: IAuthenticateDeliveryman) {
    // Receber username e password

    // Verificar se username cadastrado
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username
      }
    });

    if(!deliveryman) {
      throw new Error("Username or password invalid!");
    }

    // verificar se password esta correto
    const passwordMatch = await compare(password, deliveryman.password);

    if(!passwordMatch) {
      throw new Error("Username or password invalid!");
    }

    // Gerar o token
    const token = sign({username}, "1c0c5c598fd0f856bf8fd82183e1a0bd", {
      subject: deliveryman.id,
      expiresIn: "1d"
    });

    return token;
  }
}