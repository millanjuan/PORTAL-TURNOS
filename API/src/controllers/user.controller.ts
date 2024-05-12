import { Request, Response } from "express";
import UserService from "../services/user.service";
import { CustomError } from "../utils/classes/classes";
import { userErrors } from "../utils/errors/errorsTypes/errors.user";
import { AuthenticatedRequest } from "../utils/interfaces/user.interface";

class UserController {
  async getUserByIdentity(req: Request, res: Response): Promise<void> {
    try {
      const { typeidentity, identity } = req.body;
      const user = await UserService.getUserByIdentity(typeidentity, identity);
      res.status(200).json({ success: true, user: user });
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

  async getUserProfile(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const id = req.user?._id;
      if (!id) {
        throw new CustomError(userErrors.ID_ERROR, 400);
      }
      const userProfile = await UserService.getUserProfile(id);
      res.status(200).json({ success: true, profile: userProfile });
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

  async putUserProfile(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const id = req.user?._id;
      const updatedUserInfo = req.body;
      if (!id) {
        throw new CustomError(userErrors.ID_ERROR, 400);
      }
      const updatedUser = await UserService.putUserProfile(id, updatedUserInfo);
      res.status(200).json({ success: true, user: updatedUser });
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

export default new UserController();
