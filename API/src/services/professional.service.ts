import { Professional, IProfessional } from "../models/professional.model";
import { professionalErrors } from "../utils/errors/errorsTypes/errors.professional";
import { CustomError } from "../utils/classes/classes";
import { GetProfessionalsParams } from "../utils/interfaces/professional.interface";

class ProfessionalService {
  async getProfessionals({
    page = 1,
    pageSize = 12,
    nameFilter,
    specialityId,
  }: GetProfessionalsParams): Promise<{
    total: number;
    professionals: IProfessional[];
  }> {
    try {
      const parsedPage = Math.max(1, page);
      const parsedPageSize = Math.max(1, pageSize);

      let filter: any = {};
      //todo verificar simplificaciones
      if (nameFilter) {
        filter.$or = [
          { firstname: { $regex: nameFilter, $options: "i" } },
          { lastname: { $regex: nameFilter, $options: "i" } },
        ];
      }

      if (specialityId) {
        filter.speciality = specialityId;
      }

      const countQuery = Professional.find(filter).countDocuments();
      const professionalsQuery = Professional.find(filter)
        .skip((parsedPage - 1) * parsedPageSize)
        .limit(parsedPageSize);

      const [total, professionals] = await Promise.all([
        countQuery,
        professionalsQuery,
      ]);

      return { total, professionals };
    } catch (error) {
      throw error;
    }
  }

  async getProfessionalsBySpeciality(id: string): Promise<IProfessional[]> {
    try {
      const professionals = Professional.find({ speciality: id });
      if (!professionals) {
        throw new CustomError(professionalErrors.NOT_FOUND, 404);
      }
      return professionals;
    } catch (error) {
      throw error;
    }
  }

  async newProfessional(data: IProfessional): Promise<IProfessional> {
    try {
      const { firstname, lastname, image, speciality } = data;

      const newProfessional: IProfessional = new Professional({
        firstname,
        lastname,
        image,
        speciality,
      });

      const savedProfessional = await newProfessional.save();
      return savedProfessional;
    } catch (error) {
      throw error;
    }
  }

  async updateProfessional(
    professionalId: string,
    data: Partial<IProfessional>
  ): Promise<IProfessional> {
    try {
      const professional = await Professional.findByIdAndUpdate(
        professionalId,
        data,
        { new: true }
      );
      if (!professional) {
        throw new CustomError(professionalErrors.NOT_FOUND, 404);
      }
      return professional;
    } catch (error) {
      throw error;
    }
  }

  async deleteProfessional(
    professionalId: string
  ): Promise<IProfessional | null> {
    try {
      const deletedProfessional = await Professional.findByIdAndDelete(
        professionalId
      );
      if (!deletedProfessional) {
        throw new CustomError(professionalErrors.NOT_FOUND, 404);
      }
      return deletedProfessional;
    } catch (error) {
      throw error;
    }
  }
}

export default new ProfessionalService();
