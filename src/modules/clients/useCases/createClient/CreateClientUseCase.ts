interface ICreateClient {
  username: string;
  password: string;
}

export class CreateClient {
  async execute({username, password}: ICreateClient) {
    // Validar se o usuario existe

    // Criptografar a palavra passe

    // Salvar o cliete no banco de dados
  }
}
