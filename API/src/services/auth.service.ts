import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, IUser } from "../models/user.model";

import dotenv from "dotenv";

dotenv.config();

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

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
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
  }

  async validateUser(username: string, password: string) {
    const user = await User.findOne({ username });

    if (!user || !bcryptjs.compareSync(password, user.password)) {
      throw new Error("Invalid username/password");
    }
    const payload: Partial<IUser> = {
      _id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      typeidentity: user.typeidentity,
      identity: user.identity,
      birthdate: user.birthdate,
      verified: user.verified,
      rol: user.rol,
    };
    const expiresIn = 8 * 60 * 60; // 8 hours
    const token = jwt.sign({ user }, SECRET_KEY, {
      expiresIn,
    });
    const expirationTime = new Date(Date.now() + expiresIn * 1000);

    return { success: true, token, expirationTime, userData: payload };
  }
}
export default new AuthService();
