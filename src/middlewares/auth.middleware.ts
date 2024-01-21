/* eslint-disable prettier/prettier */
import { ReturnError } from "@exceptions/dtos/return-error.dto";
import { verifyToken } from "@utils/auth";
import { NextFunction, Request, Response } from "express";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { authorization } = req.headers;

  await verifyToken(authorization)
    .then(() => {
      next();
    })
    .catch((error) => {
      return new ReturnError(res, error)
    })
}