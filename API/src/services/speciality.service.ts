import { Speciality, ISpeciality } from "../models/speciality.model";
import { CustomError } from "../utils/classes/classes";
import { specialityErrors } from "../utils/errors/errorsTypes/errors.speciality";

class SpecialityService {
  async getAllSpecialities(): Promise<ISpeciality[]> {
    try {
      const specialities = await Speciality.find();
      return specialities;
    } catch (error) {
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

      if (!newSpeciality) {
        throw new CustomError(specialityErrors.CREATE_ERROR, 400);
      }

      await newSpeciality.save();
      return newSpeciality;
    } catch (error) {
      throw error;
    }
  }
  async updateSpeciality(
    specialityId: string,
    data: Partial<ISpeciality>
  ): Promise<ISpeciality> {
    try {
      const speciality = await Speciality.findByIdAndUpdate(
        specialityId,
        data,
        { new: true }
      );
      if (!speciality) {
        throw new CustomError(specialityErrors.NOT_FOUND, 404);
      }
      return speciality;
    } catch (error) {
      throw error;
    }
  }

  async deleteSpeciality(specialityId: string): Promise<ISpeciality> {
    try {
      const deletedSpeciality = await Speciality.findByIdAndDelete(
        specialityId
      );
      if (!deletedSpeciality) {
        throw new CustomError(specialityErrors.NOT_FOUND, 404);
      }
      return deletedSpeciality;
    } catch (error) {
      throw error;
    }
  }
}

export default new SpecialityService();
