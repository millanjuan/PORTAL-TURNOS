import { User, IUser } from "../models/user.model";

class UserService {
  async getUserByIdentity(
    typeidentity: string,
    identity: string
  ): Promise<Partial<IUser>> {
    try {
      const existingUser = await User.findOne({ typeidentity, identity });
      if (!existingUser) {
        throw new Error("User not found");
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
        verified: existingUser.verified,
        picture: existingUser.picture,
        role: existingUser.role,
      };

      return newUser;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async getUserProfile(id: string): Promise<Partial<IUser>> {
    try {
      const user = await User.findById(id, {
        select: {
          _id: 0,
          email: 0,
          password: 0,
          username: 0,
        },
      });

      if (!user) {
        throw new Error("User not found.");
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
        verified: user.verified,
        picture: user.picture,
        role: user.role,
      };

      return userProfile;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async putUserProfile(id: string, updatedUserInfo: Partial<IUser>) {
    try {
      const user = await User.findByIdAndUpdate(id, updatedUserInfo, {
        new: true,
      });

      if (!user) {
        throw new Error("User not found.");
      }

      return user;
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  }
}

export default new UserService();
