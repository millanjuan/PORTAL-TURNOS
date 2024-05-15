import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { authErrors } from "../utils/errors/errorsTypes/errors.auth";
config();

interface AuthRequest extends Request {
  user?: any;
}

const { SECRET_KEY } = process.env;

export const verifyToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, error: authErrors.TOKEN_ERROR });
  }

  jwt.verify(token, SECRET_KEY as string, (err, user) => {
    if (err) {
      console.log(err);
      console.log(token);
      return res
        .status(403)
        .json({ success: false, error: authErrors.INVALID_TOKEN });
    }
    req.user = user;
    next();
  });
};

export const verifyAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  if (!user || user.role !== "admin") {
    return res
      .status(403)
      .json({ success: false, error: authErrors.UNAUTHORIZED });
  }

  next();
};
