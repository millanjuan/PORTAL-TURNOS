import { Request, Response } from "express";
import SpecialityService from "../services/speciality.service";
import { ISpeciality } from "../models/speciality.model";
import { CustomError } from "../utils/classes/classes";

class SpecialityController {
  async getAllSpecialities(req: Request, res: Response): Promise<void> {
    try {
      const specialities = await SpecialityService.getAllSpecialities();
      res.status(200).json({ success: true, specialities: specialities });
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

  async newSpeciality(req: Request, res: Response): Promise<void> {
    try {
      const data: ISpeciality = req.body;
      const newSpeciality = await SpecialityService.newSpeciality(data);

      res.status(201).json({ success: true, speciality: newSpeciality });
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

  async updateSpeciality(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data: Partial<ISpeciality> = req.body;
      const updatedSpeciality = await SpecialityService.updateSpeciality(
        id,
        data
      );
      res.status(200).json({ success: true, speciality: updatedSpeciality });
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

  async deleteSpeciality(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await SpecialityService.deleteSpeciality(id);

      res.status(200).json({ success: true });
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

export default new SpecialityController();
