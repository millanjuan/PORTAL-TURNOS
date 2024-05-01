import { Request, Response } from "express";
import AuthService from "../services/auth.service";
import CustomError from "../utils/errors/CustomError";
import {
  creatingError2,
  validatingError2,
} from "../utils/errors/errorsTypes/errors.auth";

import dotenv from "dotenv";

dotenv.config();

class AuthController {
  async createUser(req: Request, res: Response) {
    try {
      const userData = req.body;
      const newUser = await AuthService.createUser(userData);
      res.status(201).json(newUser);
    } catch (error) {
      if (error instanceof CustomError) {
        console.error(creatingError2, error.message);
        res
          .status(error.statusCode)
          .json({ success: false, error: error.message });
      }
    }
  }
  async validateUser(req: Request, res: Response) {
    const { username, password } = req.body;
    try {
      const authData = await AuthService.validateUser(username, password);
      res.status(200).json({ ...authData });
    } catch (error) {
      if (error instanceof CustomError) {
        console.error(validatingError2, error.message);
        res
          .status(error.statusCode)
          .json({ success: false, error: error.message });
      }
    }
  }
}

export default new AuthController();
