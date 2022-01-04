import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { prisma } from "../../../database/prismaClient";

interface IAuthenticateClient {
  username: string;
  password: string;
}

export class AuthenticateClientUseCase {
  async execute({username, password}: IAuthenticateClient){
    // Receber username e password

    // Verificar se username cadastrado
    const client = await prisma.clients.findFirst({
      where: {
        username
      }
    });

    if(!client) {
      throw new Error("Username or password invalid!")
    }

    // verificar se password esta correto
    const passwordMatch = await compare(password, client.password);

    if(!passwordMatch) {
      throw new Error("Username or password invalid!");
    }

    // Gerar o token
    const token = sign({username}, "1c0c5c598fd0f946bf8fd82183e1a0b0", {
      subject: client.id,
      expiresIn: "1d"
    });

    return token;
  }
}