import { prisma } from "../../../../database/prismaClient";

interface ICreateClient {
  username: string;
  password: string;
}

export class CreateClient {
  async execute({username, password}: ICreateClient) {
    // Validar se o usuario existe
    const clientExist = await prisma.clients.findFirst({
      where: {
        username: {
          mode: "insensitive"
        }
      }
    });

    if (clientExist) {
      throw new Error("Client already exists!")
    }
    // Criptografar a palavra passe

    // Salvar o cliete no banco de dados
  }
}
