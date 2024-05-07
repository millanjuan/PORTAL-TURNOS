import { Request, Response } from "express";
import RestoreService from "../services/restore.service";
import { CustomError } from "../utils/classes/classes";

class RestoreController {
  async generateCode(req: Request, res: Response) {
    try {
      const { email, credential } = req.body;
      await RestoreService.generateCode(email, credential);
      return res.status(201).json({ success: true });
    } catch (error) {
      if (error instanceof CustomError) {
        res
          .status(error.statusCode)
          .json({ success: false, error: error.message });
      } else {
        res.status(500).json({ success: false, error });
      }
    }
  }

  async verifyCode(req: Request, res: Response) {
    try {
      const { credential, code } = req.body;
      const verify = await RestoreService.verifyCode(credential, code);
      return res.status(200).json({ success: true, id: verify });
    } catch (error) {
      if (error instanceof CustomError) {
        res
          .status(error.statusCode)
          .json({ success: false, error: error.message });
      } else {
        res.status(500).json({ success: false, error });
      }
    }
  }

  async passwordRestore(req: Request, res: Response) {
    try {
      const { id, password } = req.body;
      await RestoreService.passwordRestore(id, password);
      return res.status(200).json({ success: true });
    } catch (error) {
      if (error instanceof CustomError) {
        res
          .status(error.statusCode)
          .json({ success: false, error: error.message });
      } else {
        res.status(500).json({ success: false, error });
      }
    }
  }
  async usernameRestore(req: Request, res: Response) {
    try {
      const { id, username } = req.body;
      await RestoreService.usernameRestore(id, username);
      return res.status(200).json({ success: true });
    } catch (error) {
      if (error instanceof CustomError) {
        res
          .status(error.statusCode)
          .json({ success: false, error: error.message });
      } else {
        res.status(500).json({ success: false, error });
      }
    }
  }
}

export default new RestoreController();
