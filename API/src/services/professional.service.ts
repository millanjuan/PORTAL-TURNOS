import { Professional, IProfessional } from "../models/professional.model";

interface GetProfessionalsParams {
  page?: number;
  pageSize?: number;
  nameFilter?: string;
  specialityId?: string;
}

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

      if (nameFilter) {
        filter.$or = [
          { firstname: { $regex: new RegExp(nameFilter, "i") } },
          { lastname: { $regex: new RegExp(nameFilter, "i") } },
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
      console.error("Error fetching professionals:", error);
      throw error;
    }
  }

  async newProfessional(data: IProfessional): Promise<IProfessional> {
    try {
      const { firstname, lastname, speciality } = data;

      const newProfessional: IProfessional = new Professional({
        firstname,
        lastname,
        speciality,
      });

      const savedProfessional = await newProfessional.save();
      return savedProfessional;
    } catch (error) {
      console.error("Error creating new professional:", error);
      throw error;
    }
  }

  async updateProfessional(
    professionalId: string,
    data: Partial<IProfessional>
  ): Promise<IProfessional | null> {
    try {
      const professional = await Professional.findByIdAndUpdate(
        professionalId,
        data,
        { new: true }
      );
      return professional || null;
    } catch (error) {
      console.error("Error updating professional:", error);
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
      return deletedProfessional || null;
    } catch (error) {
      console.error("Error deleting professional:", error);
      throw error;
    }
  }
}

export default new ProfessionalService();
