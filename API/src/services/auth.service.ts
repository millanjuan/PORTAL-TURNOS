import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, IUser } from "../models/user.model";
import CustomError from "../utils/errors/CustomError";
import {
  invalidCredentials,
  creatingError,
  creatingError2,
  validatingError,
  validatingError2,
  alreadyExists,
  emailExist,
} from "../utils/errors/errorsTypes/errorsTypes.auth";
import { config } from "dotenv";
config();

let SECRET_KEY: string;

if (process.env.SECRET_KEY) {
  SECRET_KEY = process.env.SECRET_KEY;
}
class AuthService {
  async createUser(userData: IUser) {
    const {
      email,
      username,
      password,
      firstname,
      lastname,
      identity,
      typeidentity,
      birthdate,
    } = userData;
    try {
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        throw new CustomError(emailExist, 409);
      }

      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        throw new CustomError(alreadyExists, 409);
      }

      const hashedPassword = bcryptjs.hashSync(password, 10);

      const newUser = new User({
        email: email.toLowerCase(),
        username,
        password: hashedPassword,
        firstname,
        lastname,
        identity,
        typeidentity,
        birthdate,
      });

      await newUser.save();

      return { success: true, newUser };
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      } else {
        console.error(creatingError2, error); // con :
        throw new CustomError(creatingError, 500); //sin :
      }
    }
  }

  async validateUser(username: string, password: string) {
    try {
      const user = await User.findOne({ username });

      if (!user || !bcryptjs.compareSync(password, user.password)) {
        throw new CustomError(invalidCredentials, 401);
      }

      const payload: Partial<IUser> = {
        _id: user._id,
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        typeidentity: user.typeidentity,
        identity: user.identity,
        birthdate: user.birthdate,
        verified: user.verified,
        role: user.role,
      };
      const expiresIn = 8 * 60 * 60; // 8 horas
      const token = jwt.sign(payload, SECRET_KEY, {
        expiresIn,
      });
      const expirationTime = new Date(Date.now() + expiresIn * 1000);

      return { success: true, token, expirationTime, userData: payload };
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      } else {
        console.error(validatingError2, error);
        throw new CustomError(validatingError, 500);
      }
    }
  }
}
export default new AuthService();
