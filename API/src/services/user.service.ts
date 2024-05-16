import { User, IUser } from "../models/user.model";
import { CustomError } from "../utils/classes/classes";
import { userErrors } from "../utils/errors/errorsTypes/errors.user";

class UserService {
  //TODO crear filtrado y paginado con mongoose
  async getUserByIdentity(
    typeidentity: string,
    identity: string
  ): Promise<Partial<IUser>> {
    try {
      const existingUser = await User.findOne({ typeidentity, identity });
      if (!existingUser) {
        throw new CustomError(userErrors.NOT_FOUND, 404);
      }

      const newUser: Partial<IUser> = {
        id: existingUser.id,
        email: existingUser.email,
        firstname: existingUser.firstname,
        lastname: existingUser.lastname,
        identity: existingUser.identity,
        typeidentity: existingUser.typeidentity,
        address: existingUser.address,
        cellphone: existingUser.cellphone,
        gender: existingUser.gender,
        birthdate: existingUser.birthdate,
        picture: existingUser.picture,
        role: existingUser.role,
      };

      return newUser;
    } catch (error) {
      throw error;
    }
  }
  async getUserProfile(id: string): Promise<Partial<IUser>> {
    try {
      const user = await User.findById(id, {
        select: {
          email: 0,
          password: 0,
        },
      });

      if (!user) {
        throw new CustomError(userErrors.NOT_FOUND, 404);
      }

      const userProfile: Partial<IUser> = {
        firstname: user.firstname,
        lastname: user.lastname,
        identity: user.identity,
        typeidentity: user.typeidentity,
        address: user.address,
        cellphone: user.cellphone,
        gender: user.gender,
        birthdate: user.birthdate,
        picture: user.picture,
        role: user.role,
        email: user.email,
      };

      return userProfile;
    } catch (error) {
      throw error;
    }
  }
  async putUserProfile(id: string, updatedUserInfo: Partial<IUser>) {
    try {
      const user = await User.findByIdAndUpdate(id, updatedUserInfo, {
        new: true,
      });

      if (!user) {
        throw new CustomError(userErrors.NOT_FOUND, 404);
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();
