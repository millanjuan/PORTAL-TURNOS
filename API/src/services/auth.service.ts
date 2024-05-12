import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, IUser } from "../models/user.model";
import { CustomError } from "../utils/classes/classes";
import { authErrors } from "../utils/errors/errorsTypes/errors.auth";
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
      role,
    } = userData;
    try {
      const existingUser = await User.findOne({
        $or: [{ email }, { username }],
      });

      if (existingUser) {
        if (existingUser.email === email) {
          throw new CustomError(authErrors.EMAIL_EXISTS, 409);
        } else {
          throw new CustomError(authErrors.USER_EXISTS, 409);
        }
      }

      const hashedPassword = bcryptjs.hashSync(password, 10);

      const newUser = new User({
        email: email.toLowerCase(),
        username,
        password: hashedPassword,
        firstname: firstname.toLowerCase(),
        lastname: lastname.toLowerCase(),
        identity,
        typeidentity: typeidentity.toLowerCase(),
        birthdate,
        role,
      });
      await newUser.save();
      const payload: Partial<IUser> = {
        _id: newUser._id,
        email: newUser.email,
        username: newUser.username,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        identity: newUser.identity,
        typeidentity: newUser.typeidentity,
        birthdate: newUser.birthdate,
      };
      const expiresIn = 8 * 60 * 60;
      const token = jwt.sign(payload, SECRET_KEY, {
        expiresIn,
      });
      const expirationTime = new Date(Date.now() + expiresIn * 1000);

      return { token, expirationTime, user: payload };
    } catch (error) {
      throw error;
    }
  }

  async validateUser(username: string, password: string) {
    try {
      const user = await User.findOne({ username });

      if (!user || !bcryptjs.compareSync(password, user.password)) {
        throw new CustomError(authErrors.INVALID_CREDENTIALS, 401);
      }

      const payload: Partial<IUser> = {
        _id: user._id,
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

      return { token, expirationTime, user: payload };
    } catch (error) {
      throw error;
    }
  }
}
export default new AuthService();
