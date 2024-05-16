import { Request, Response } from "express";
import AuthService from "../services/auth.service";
import { CustomError } from "../utils/classes/classes";

import dotenv from "dotenv";

dotenv.config();

class AuthController {
  async createUser(req: Request, res: Response) {
    try {
      const userData = req.body;
      const newUser = await AuthService.createUser(userData);
      if (newUser) {
        res.status(201).json({ success: true, ...newUser });
      }
    } catch (error) {
      if (error instanceof CustomError) {
        res
          .status(error.statusCode)
          .json({ success: false, error: error.message });
      } else {
        return res.status(500).json({ success: false, error });
      }
    }
  }
  async validateUser(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const authData = await AuthService.validateUser(email, password);
      res.status(200).json({ success: true, ...authData });
    } catch (error) {
      if (error instanceof CustomError) {
        res
          .status(error.statusCode)
          .json({ success: false, error: error.message });
      } else {
        return res.status(500).json({ success: false, error });
      }
    }
  }
}

export default new AuthController();
