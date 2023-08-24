import Joi from "joi";
import { body } from "express-validator";

export const createAdminValidator = [
  body("username").trim().notEmpty().withMessage("Username is required"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail(),
];

export const createUserValidator = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  userName: Joi.string().required(),
  phoneNumber: Joi.string().required().min(11),
  email: Joi.string().trim().lowercase().required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{4,8}$/)
    .required()
    .label("Password")
    .messages({
      "string.pattern.base": "Password must contain only alphabets and numbers",
    }),
  confirm_password: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .label("Confirm password")
    .messages({ "any.only": "Confirm password does not match" }),
});

export const loginUserSchema = Joi.object().keys({
  email: Joi.string().trim().lowercase().required(),
  password: Joi.string()
    .min(5)
    .regex(/^[a-zA-Z0-9]{5,15}$/)
    .required(),
});

export const loginAdminSchema = Joi.object({
  email: Joi.string().trim().required(),
  password: Joi.string().min(6).required(),
});

export const variables = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};

// types.ts

import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

// Extend the Request interface to include the userId property
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

// Define the interface for the JWT payload (you can add more fields if needed)
export interface MyJwtPayload extends JwtPayload {
  userId: string;
}
