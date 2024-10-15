import {
  hashString,
  isValidPassword,
  compareString,
  createJWT,
} from "../utils/index.js";
import User from "../models/User.js";
import Otp from "../models/OneTimePassword.js";
import {
  sendVerificationEmail,
  sendOneTimePassword,
} from "../utils/sendEmail.js";

// REGISTER
export const register = async (req, res, next) => {
  const { userName, email, password, role } = req.body;

  try {
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res
        .status(409)
        .json({ success: false, message: "Email Address already exists" });
    }

    const isValid = isValidPassword(password);
    if (!isValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Password" });
    }
    const hashedPassword = await hashString(password);

    const user = await User.create({
      userName,
      role,
      email,
      password: hashedPassword,
      createdAt: Date.now(),
    });

    await user.validate();

    await user.save();

    user.password = undefined;

    const emailResult = await sendVerificationEmail(user);

    const token = createJWT(user?._id);

    res.status(201).json({
      success: true,
      message: !emailResult.success
        ? "User registered, but failed to send verification email."
        : "User registered and verification email sent successfully.",
      user,
      token,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res, next) => {
  const { email, password, rememberMe } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }
    // If user is a google account, send message
    if (user.googleId) {
      return res
        .status(404)
        .json({ success: false, message: "Sign in with Google account" });
    }
    const isMatch = await compareString(password, user?.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Password" });
    }
    user.password = undefined;

    const token = createJWT(user?._id, rememberMe);

    res.status(201).json({
      success: true,
      message: "Login successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

// LOGIN GOOGLE
export const loginGoogle = async (req, res, next) => {
  const { googleId, name, businessId, email, role } = req.body.user;
  const { rememberMe } = req.body;

  try {
    // USER by GOOGLE ID
    let user = await User.findOne({ googleId: googleId });
    // USER by EMAIL
    let userExists = await User.findOne({ email: email });

    // is no user w/googleId or email, need to sign up
    if (!user && !userExists) {
      return res.status(409).json({
        success: false,
        message: "Please SIGN UP with Google Account",
      });
    }

    // if NO GOOGLE USER, but user w/email, regular account w/email already exists
    if (!user && userExists) {
      return res.status(409).json({
        success: false,
        message: "Email Address already exists: Sign in w/ email & password",
      });
    }

    const token = createJWT(user?._id, rememberMe);

    res.status(201).json({
      success: true,
      user,
      token,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// SIGN UP/CREATE USER with GOOGLE =>
export const createUserGoogle = async (req, res, next) => {
  const { googleId, name, businessId, email, role } = req.body;
  try {
    // user by googleID
    let user = await User.findOne({ googleId: googleId });
    // get by emial (could be regular account w/same email)
    let userExists = await User.findOne({ email: email });

    // IF can't find user, but email exists, then email address already used for regular sign up
    if (!user && userExists) {
      return res
        .status(409)
        .json({ success: false, message: "Email Address already exists" });
    }

    // IF NO USER, CREATE USER
    if (!user) {
      user = await User.create({
        googleId: googleId,
        email: email,
        userName: name,
        role: role,
      });
    }

    const emailResult = await sendVerificationEmail(user);

    if (!emailResult.success) {
      console.error(emailResult.message);
      return res.status(500).json({
        success: false,
        message: "User registered, but failed to send verification email.",
      });
    }

    const token = createJWT(user?._id);

    res.status(201).json({
      success: true,
      user,
      token,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// SEND ONE TIME PASSWORD
export const sendOtp = async (req, res, next) => {
  const { name, email, role } = req.body;

  try {
    const emailSent = await sendOneTimePassword(req.user);

    if (!emailSent.success) {
      return res.status(500).json({
        success: false,
        message: "Failed to sent OTP.",
      });
    }
    res.status(201).json({
      success: true,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// VERIFY ONE TIME PASSWORD
export const verifyOtp = async (req, res, next) => {
  const { otp } = req.body;
  const userId = req.user._id;

  try {
    const otpEntry = await Otp.findOne({ userId, otp });
    if (!otpEntry) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    // Check if the OTP has expired
    const currentTime = new Date();
    if (currentTime > otpEntry.expirationTime) {
      return res.status(400).json({ error: "OTP has expired" });
    }
    await Otp.deleteOne({ userId, otp });

    res.status(201).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// RESEND VERIFICATION EMAIL
export const resendVerifyEmail = async (req, res, next) => {
  const { user } = req.body;

  try {
    const emailResult = await sendVerificationEmail(user);

    if (!emailResult.success) {
      console.error(emailResult.message);

      return res.status(500).json({
        success: false,
        message: "Failed to send verification email.",
      });
    } else {
      return res.status(201).json({
        success: true,
        message: "Verification email sent",
      });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
