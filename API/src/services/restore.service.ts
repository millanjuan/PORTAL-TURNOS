import { VerificationCode } from "../models/code.model";
import { User } from "../models/user.model";
import { CustomError } from "../utils/classes/classes";
import { sendVerificationEmail } from "../utils/emails/emails";
import { restoreErrors } from "../utils/errors/errorsTypes/errors.restore";
import { generateVerificationCode } from "../utils/functions/functions";
import bcryptjs from "bcryptjs";

class RestoreService {
  async generateCode(email: string) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new CustomError(restoreErrors.EMAIL_ERROR, 404);
      }
      const code = generateVerificationCode();
      const expirationDate = new Date();
      expirationDate.setMinutes(expirationDate.getMinutes() + 10);

      const verificationCode = new VerificationCode({
        code,
        expirationDate,
        user: user._id,
      });
      await verificationCode.save();
      sendVerificationEmail(email, code);
    } catch (error) {
      throw error;
    }
  }

  async verifyCode(code: string): Promise<string> {
    try {
      const codeMatch = await VerificationCode.findOne({ code });
      if (!codeMatch) {
        throw new CustomError(restoreErrors.INVALID_CODE, 400);
      }
      const id = codeMatch.user;
      const now = new Date();
      if (codeMatch.expirationDate < now) {
        throw new CustomError(restoreErrors.EXPIRED_CODE, 400);
      }
      await VerificationCode.deleteOne({ code });
      return id;
    } catch (error) {
      throw error;
    }
  }

  async passwordRestore(id: string, password: string): Promise<void> {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new CustomError(restoreErrors.USER_NOT, 404);
      }
      const newPassword = bcryptjs.hashSync(password, 10);
      user.password = newPassword;
      await user.save();
    } catch (error) {
      throw error;
    }
  }
}

export default new RestoreService();
