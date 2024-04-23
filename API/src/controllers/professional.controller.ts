import { Request, Response } from "express";
import ProfessionalService from "../services/professional.service";
import { IProfessional } from "../models/professional.model";

class ProfessionalController {
  async getProfessionals(req: Request, res: Response): Promise<void> {
    try {
      const query = req.query;
      const professionals = await ProfessionalService.getProfessionals(query);
      res.status(200).json({ professionals });
    } catch (error) {
      res.status(500).json({ error: "Error fetching professionals" });
    }
  }

  async newProfessional(req: Request, res: Response): Promise<void> {
    try {
      const data: IProfessional = req.body;
      const newProfessional = await ProfessionalService.newProfessional(data);

      res.status(201).json(newProfessional);
    } catch (error) {
      console.error("Error creating new professional:", error);
      res.status(500).json({ error: "Internal server error" });
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

      if (!updatedProfessional) {
        res.status(404).json({ error: "Professional not found" });
        return;
      }

      res.status(200).json(updatedProfessional);
    } catch (error) {
      console.error("Error updating professional:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteProfessional(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deletedProfessional = await ProfessionalService.deleteProfessional(
        id
      );

      if (!deletedProfessional) {
        res.status(404).json({ error: "Professional not found" });
        return;
      }

      res.status(200).json(deletedProfessional);
    } catch (error) {
      console.error("Error deleting professional:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new ProfessionalController();
