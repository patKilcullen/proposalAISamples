import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import crypto from "crypto";
import Otp from "../models/OneTimePassword.js";

// CHECK HASHED STRING
export const compareString = async (userPassword, password) => {
  const isMatch = await bcrypt.compare(userPassword, password);
  return isMatch;
};

// HASH THE STRING
export const hashString = async (useValue) => {
  const salt = await bcrypt.genSalt(10);

  const hashedpassword = await bcrypt.hash(useValue, salt);
  return hashedpassword;
};

//CREATE JWT TOKEN
export function createJWT(id, rememberMe) {
  return JWT.sign({ userId: id }, process.env.JWT_SECRET_KEY, {
    expiresIn: rememberMe ? "7d"  : "1h",
  });
}

// CHECK VALID PASSWORD: len-8, lower, upper, special, number
export function isValidPassword(password) {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[\\#_!~&^\\$*@]/.test(password);

  if (
    password.length < minLength ||
    !hasUpperCase ||
    !hasLowerCase ||
    !hasNumber ||
    !hasSpecial
  ) {
    return false;
  } else {
    return true;
  }
}

// CHECK URL FORMAT
export function isValidURL(string) {
  try {
    new URL(string);
    return true;
  } catch (error) {
    return false;
  }
}

export const generateAndStoreOtp = async (userId) => {
  const otp = crypto.randomInt(0, 1000000);
  // const otp = crypto.randomBytes(3).toString("hex"); // Generate a 6-character OTP
  const expirationTime = new Date();
  expirationTime.setMinutes(expirationTime.getMinutes() + 15); // Set OTP expiration time to 5 minutes

  const newOtp = new Otp({
    otp,
    userId,
    expirationTime,
  });

  await newOtp.save();

  return otp;
};
