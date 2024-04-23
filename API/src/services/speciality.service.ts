import { Speciality, ISpeciality } from "../models/speciality.model";

class SpecialityService {
  async getAllSpecialities(): Promise<ISpeciality[]> {
    try {
      const specialities = await Speciality.find();
      return specialities;
    } catch (error) {
      console.error("Error fetching specialities:", error);
      throw error;
    }
  }

  async newSpeciality(data: ISpeciality): Promise<ISpeciality> {
    try {
      const { name, image, professionals } = data;

      const newSpeciality: ISpeciality = new Speciality({
        name,
        image,
        professionals,
      });

      const savedSpeciality = await newSpeciality.save();
      return savedSpeciality;
    } catch (error) {
      console.error("Error creating new speciality:", error);
      throw error;
    }
  }
  async updateSpeciality(
    specialityId: string,
    data: Partial<ISpeciality>
  ): Promise<ISpeciality | null> {
    try {
      const speciality = await Speciality.findByIdAndUpdate(
        specialityId,
        data,
        { new: true }
      );
      return speciality || null;
    } catch (error) {
      console.error("Error updating speciality:", error);
      throw error;
    }
  }

  async deleteSpeciality(specialityId: string): Promise<ISpeciality | null> {
    try {
      const deletedSpeciality = await Speciality.findByIdAndDelete(
        specialityId
      );
      return deletedSpeciality || null;
    } catch (error) {
      console.error("Error deleting professional:", error);
      throw error;
    }
  }
}

export default new SpecialityService();
