import { Request, Response } from "express";
import AuthService from "../services/auth.service";

import dotenv from "dotenv";

dotenv.config();

class AuthController {
  async createUser(req: Request, res: Response) {
    try {
      const userData = req.body;
      const newUser = await AuthService.createUser(userData);
      res.status(201).json(newUser);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  async validateUser(req: Request, res: Response) {
    const { username, password } = req.body;
    try {
      const authData = await AuthService.validateUser(username, password);
      res.status(200).json({ ...authData });
    } catch (error) {
      console.error("Error validating user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new AuthController();
