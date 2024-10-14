import User from "../models/User.js";
import Contacts from "../models/Contacts.js";
import Verification from "../models/emailVerification.js";
import passwordReset from "../models/passwordReset.js";
import {
  resetPasswordLink,
  sendAccountActivation,
} from "../utils/sendEmail.js";
import { compareString, hashString } from "../utils/index.js";
import path from "path";
import fs from "fs";
// GET User
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id)
      .select("-password")
      .populate("businessId")
      .populate("proposals");

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    res.status(200).json({
      user,
      success: true,
    });
  } catch (err) {
    console.log("Error in Get User : ", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update User
export const updateUserNEW = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userName, mobile, address, profileUrl } = req.body;

    if (!userName || !mobile || !address || !profileUrl) {
      return res.status(400).json({
        message: "please provide all required fields",
      });
    }

    const user = await User.findByIdAndUpdate(
      id,
      {
        $set: { userName, mobile, address, profileUrl, updatedAt: Date.now() },
      },
      { new: true, select: "-password" }
    );

    res.status(200).json({
      sucess: true,
      message: "User updated successfully",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
// UPDATED... using old update user
export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {profileUrl} = req.body

        if (profileUrl) {
          const base64Data = profileUrl.replace(/^data:image\/\w+;base64,/, ""); // Remove metadata prefix
          const fileType = profileUrl.split(";")[0].split("/")[1]; // Extract file extension

          const fileName = `${Date.now()}.${fileType}`; // Generate a unique file name
          const filePath = path.join("uploads/profileUrls/", fileName); // Define file path

          // Create directory
          const directory = path.dirname(filePath);
          if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
          }

          fs.writeFile(filePath, base64Data, "base64", (err) => {
            if (err) {
              console.error("Error saving the image:", err);
              return res
                .status(500)
                .json({ message: "Error saving the image" });
            }
          });

          req.body.profileUrl = `/uploads/profileUrls/${fileName}`; // Save the file path in the database
        }


    const user = await User.findByIdAndUpdate(
      id,
      { $set: { ...req.body, updatedAt: Date.now() } },
      { new: true, select: "-password" }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }


    // if (profileUrl) {
    //   const base64Data = profileUrl.replace(/^data:image\/\w+;base64,/, ""); // Remove metadata prefix
    //   const fileType = profileUrl.split(";")[0].split("/")[1]; // Extract file extension

    //   const fileName = `${Date.now()}.${fileType}`; // Generate a unique file name
    //   const filePath = path.join("uploads/profileUrls/", fileName); // Define file path

    //   // Create directory
    //   const directory = path.dirname(filePath);
    //   if (!fs.existsSync(directory)) {
    //     fs.mkdirSync(directory, { recursive: true });
    //   }

    //   fs.writeFile(filePath, base64Data, "base64", (err) => {
    //     if (err) {
    //       console.error("Error saving the image:", err);
    //       return res.status(500).json({ message: "Error saving the image" });
    //     }
    //   });

    //   req.body.profileUrl = `/uploads/profileUrls/${fileName}`; // Save the file path in the database
    // }


    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// DELETE USER
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findOneAndDelete({ _id: id });
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};

// TODO: test password reset and see is shoudl get user by id or email
export const requestPasswordResetOLD = async (req, res) => {
  try {
    const { email, userId } = req.body;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({
        status: "FAILED",
        message: "Email address not found.",
      });
    }

    const existingRequest = await passwordReset.findOne({ email });

    if (existingRequest) {
      if (existingRequest.expiresAt > Date.now()) {
        return res.status(201).json({
          status: "PENDING",
          message: "Reset password link has already been sent tp your email.",
        });
      }
      await passwordReset.findOneAndDelete({ email });
    }
    await resetPasswordLink(user, res);
  } catch (error) {}
};

export const requestPasswordReset = async (req, res) => {
  try {
    const { email, userId } = req.body;

    // const user = await User.findOne({ email });
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({
        status: "FAILED",
        message: "Email address not found.",
      });
    }

    const existingRequest = await passwordReset.findOne({ email });
    // const existingRequest = await passwordReset.findOne({ userId });

    if (existingRequest) {
      if (existingRequest.expiresAt > Date.now()) {
        return res.status(201).json({
          status: "PENDING",
          message: "Reset password link has already been sent to your email.",
        });
      }
      await passwordReset.findOneAndDelete({ email });
      // await passwordReset.findOneAndDelete({ userId });
    }

    // Create a new reset password request
    const newPasswordResetRequest = new passwordReset({
      email,
      userId,
      expiresAt: Date.now() + 3600000, // Set expiration time, e.g., 1 hour from now
    });

    await newPasswordResetRequest.save();

    await resetPasswordLink(user, res);
  } catch (error) {
    console.error("Error in requestPasswordReset: ", error);
    return res.status(500).json({
      status: "FAILED",
      message: "An error occurred while processing your request.",
    });
  }
};

// // UPDATED.... ADDED respinsed to send to front ends
export const resetPassword = async (req, res) => {
  const { userId, token } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      const message = "Invalid password reset link. Try again";
      res.status(404).json({ message });
    }

    const resetPassword = await passwordReset.findOne({ userId });

    if (!resetPassword) {
      const message = "Invalid password reset link. Try again";
      res.status(400).json({
        message: message,
      });
    }

    const { expiresAt, token: resetToken } = resetPassword;

    if (expiresAt < Date.now()) {
      const message = "Reset Password link has expired. Please try again";
      res.status(400).json({
        message: message,
      });
    } else {
      const isMatch = await compareString(token, resetToken);

      if (!isMatch) {
        const message = "Invalid reset password link. Please try again";
        res.status(400).json({ message: message });
      } else {
        res
          .status(200)
          .json({ message: "Password reset link verified successfully." });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    const hashedpassword = await hashString(password);

    const user = await User.findByIdAndUpdate(id, { password: hashedpassword });
    if (user) {
      await passwordReset.findOneAndDelete({ id });

      res.status(200).json({
        ok: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

// SEND EMAIL FOR EMAIL VERIFICATION
export const verifyEmail = async (req, res) => {
  const { userId, token } = req.params;

  try {
    const result = await Verification.findOne({ userId });
    const user = await User.findById(userId);

    if (result) {
      const { expiresAt, token: hashedToken } = result;

      // token has expired
      if (expiresAt < Date.now()) {
        await Verification.findOneAndDelete({ userId });
        await User.findOneAndDelete({ _id: userId });

        return res.status(400).json({
          status: "error",
          message: "Verification token has expired. Account has been deleted.",
        });
      } else {
        // token valid
        const isMatch = await compareString(token, hashedToken);

        if (isMatch) {
          await User.findOneAndUpdate({ _id: userId }, { verified: true });

          await Verification.findOneAndDelete({ userId });
          sendAccountActivation(user);

          return res.status(200).json({
            status: "success",
            message: "Email verified successfully",
          });
        } else {
          // invalid token

          return res.status(400).json({
            message: "Verification failed or link is invalid",
          });
        }
      }
    } else {
      return res.status(400).json({
        status: "error",
        message: "Invalid verification link. Try again later.",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: "An error occurred while verifying the email.",
    });
  }
};

// GET User Contacts
export const getUserContacts = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).populate("contacts");
    let contacts = user.contacts;

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Contact Not Found",
      });
    }

    res.status(200).json({
      contacts,
      success: true,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({ success: false, message: err.message });
  }
};

export const addContacts = async (req, res) => {
  try {
    const { id } = req.user; // Assuming the user ID is stored in req.user
    const { contacts } = req.body;

    if (!contacts || !Array.isArray(contacts)) {
      return res.status(400).json({
        success: false,
        message: "Emails must be provided in an array",
      });
    }

    const user = await User.findById(id).populate("contacts", "-__v");

    if (!user.contacts) {
      user.contacts = [];
    }

    for (const email of contacts) {
      const existingContact = user.contacts.find(
        (contact) => contact.email === email
      );

      if (!existingContact) {
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
          const newContact = await Contacts.create({
            contactId: existingUser._id,
            email,
          });
          user.contacts.push(newContact._id);
        } else {
          const newContact = await Contacts.create({ email });
          user.contacts.push(newContact._id);
        }
      }
    }

    await user.save();
    const newContacts = user.contacts;
    res.status(201).json({
      success: true,
      message: "Contacts added successfully",
      newContacts,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const addProposal = async (req, res) => {
  try {
    const { id } = req.user; 
    const { proposal } = req.body;

    const user = await User.findById(id).populate("proposals", "-__v");

    if (!user.proposals) {
      user.proposals = [];
    }

    user.proposals.push(proposal._id);

    await user.save();

    res.status(201).json({
      success: true,
      message: "Proposal added successfully",
      proposal,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

