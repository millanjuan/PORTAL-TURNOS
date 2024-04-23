import { Request, Response } from "express";
import SpecialityService from "../services/speciality.service";
import { ISpeciality } from "../models/speciality.model";

class SpecialityController {
  async getAllSpecialities(req: Request, res: Response): Promise<void> {
    try {
      const specialities = await SpecialityService.getAllSpecialities();
      res.status(200).json({ specialities });
    } catch (error) {
      res.status(500).json({ error: "Error fetching specialities" });
    }
  }

  async newSpeciality(req: Request, res: Response): Promise<void> {
    try {
      const data: ISpeciality = req.body;
      const newSpeciality = await SpecialityService.newSpeciality(data);

      res.status(201).json({ newSpeciality });
    } catch (error) {
      console.error("Error creating new speciality:", error);
      res.status(500).json({ error: "Internal server error" });
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

      if (!updatedSpeciality) {
        res.status(404).json({ error: "Speciality not found" });
        return;
      }
      res.status(200).json({ updatedSpeciality });
    } catch (error) {
      console.error("Error updating speciality:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteSpeciality(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deletedSpeciality = await SpecialityService.deleteSpeciality(id);

      if (!deletedSpeciality) {
        res.status(404).json({ error: "Speciality not found." });
        return;
      }

      res.status(200).json(deletedSpeciality);
    } catch (error) {
      console.error("Error deleting speciality:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new SpecialityController();
