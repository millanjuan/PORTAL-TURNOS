import { Request, Response } from "express";
import ProfessionalService from "../services/professional.service";
import { IProfessional } from "../models/professional.model";
import { CustomError } from "../utils/classes/classes";

class ProfessionalController {
  async getProfessionals(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      const professionals = await ProfessionalService.getProfessionals(data);
      res.status(200).json({ professionals });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ success: false, error });
      }
    }
  }

  async getProfessionalsBySpeciality(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { id } = req.params;
      const professionals =
        await ProfessionalService.getProfessionalsBySpeciality(id);
      res.status(200).json({ success: true, professionals });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ success: false, error });
      }
    }
  }

  async newProfessional(req: Request, res: Response): Promise<void> {
    try {
      const data: IProfessional = req.body;
      const newProfessional = await ProfessionalService.newProfessional(data);

      res.status(201).json(newProfessional);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ success: false, error });
      }
    }
  }

  async updateProfessional(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data: Partial<IProfessional> = req.body;
      const updatedProfessional = await ProfessionalService.updateProfessional(
        id,
        data
      );
      res.status(200).json(updatedProfessional);
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

  async deleteProfessional(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await ProfessionalService.deleteProfessional(id);
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

export default new ProfessionalController();
