import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const validateParams = (params: string[]) => {
  const validators = params.map((param) =>
    body(param).trim().notEmpty().withMessage(param)
  );

  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validators.map((validator) => validator.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const missingParams = errors.array().map((error) => error.msg);
      return res.status(400).json({
        success: false,
        error: `Missing fields: ${missingParams.join(", ")}`,
      });
    }

    next();
  };
};
