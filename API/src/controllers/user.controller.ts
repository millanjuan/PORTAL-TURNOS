import { Request, Response } from "express";
import UserService from "../services/user.service";

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}

class UserController {
  async getUserByIdentity(req: Request, res: Response): Promise<void> {
    try {
      const { typeidentity, identity } = req.body;
      const user = await UserService.getUserByIdentity(typeidentity, identity);
      res.status(200).json({ success: true, user: user });
    } catch (error) {
      console.error("Error fetching user by identity:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  }

  async getUserProfile(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const id = req.user?.id;
      if (!id) {
        throw new Error("No id provided");
      }
      const userProfile = await UserService.getUserProfile(id);
      res.status(200).json({ success: true, profile: userProfile });
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  }

  async putUserProfile(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const id = req.user?.id;
      const updatedUserInfo = req.body;
      if (!id) {
        throw new Error("No id provided");
      }
      const updatedUser = await UserService.putUserProfile(id, updatedUserInfo);
      res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
      console.error("Error updating user profile:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  }
}

export default new UserController();
