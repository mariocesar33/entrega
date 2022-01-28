import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticateDeliveryman(
  request: Request, 
  response: Response, 
  next: NextFunction
) {
  const authHearder = request.headers.authorization;

  if(!authHearder) {
    return response.status(401).json({message: "Token missing!"});
  }

  const [, token] = authHearder.split(" ");

  try {
    const { sub } = verify(token, "1c0c5c598fd0f856bf8fd82183e1a0bd") as IPayload;

    request.id_deliveryman = sub;
    return next();

  } catch (err) {
    return response.status(401).json({message: "Invalid token"});
  }
}