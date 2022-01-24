import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticateClient(
  request: Request, 
  response: Response, 
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  // se não tiver nada dentro do authHeader, passar uma mensagem de erro!
  if(!authHeader) {
    return response.status(401).json({
      message: "Token missing!",
    });
  }

  // Se tiver alguma coisa preenchida, primeiro preciso pegar o que esta dentro do token
  // a estrutura que vai vir é 1) Bearer e 2) bdjghfg65-54545
  // mas Bearer não importa o que importa é token-> bdjghfg65-54545
  // Para pegar só token fazemos o seguinte:
  const [, token ] = authHeader.split(" ");
  // [0] -> Bearer
  // [1] -> bdjghfg65-54545

  // Agora vamos validar se é um token valido
  try {
    const { sub } = verify(
      token, 
      "1c0c5c598fd0f946bf8fd82183e1a0b0"
    ) as IPayload;

    request.id_client = sub
    
    return next();
  } catch(err) {
    return response.status(401).json({
      message: "Invalid token!",
    });
  }
}