import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CONFIG } from "../config";

const NO_AUTH_PATHS = ["/login"];

export const authentication = (
  request: Request,
  reponse: Response,
  next: NextFunction
) => {
  if (NO_AUTH_PATHS.includes(request.path)) {
    next();
    return;
  }
  const headerToken = request.headers["authorization"];

  if (!headerToken) {
    reponse.status(401).send("Unauthorized");
    return;
  }
  const token = headerToken.split(" ")[1];
  try {
    jwt.verify(token, CONFIG.JWT_SECRET);
    next();
  } catch (error) {
    reponse.status(401).send("Unauthorized");
    return;
  }
};
