import Business from "../models/Business.js";
import User from "../models/User.js";
import mongoose from "mongoose";
import path from "path";
import fs from "fs";
// GET ALL Businesses
export const getAllBusiness = async (req, res) => {
  try {
    const businesses = await Business.find()
      .select(
        "businessName url contactPerson address industry businessOverview"
      )
      .populate({
        path: "contactPerson",
        select: "userName",
        model: "User",
      });

    res.status(200).json(businesses);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// CREATE Business
export const createBusiness = async (req, res) => {
  try {
    const user = req.user;
    const {logo} = req.body


      if (logo) {
        const base64Data = logo.replace(/^data:image\/\w+;base64,/, ""); // Remove metadata prefix
        const fileType = logo.split(";")[0].split("/")[1]; // Extract file extension

        const fileName = `${Date.now()}.${fileType}`; // Generate a unique file name
        const filePath = path.join("uploads/logos/", fileName); // Define file path

        // Create directory
        const directory = path.dirname(filePath);
        if (!fs.existsSync(directory)) {
          fs.mkdirSync(directory, { recursive: true });
        }

        fs.writeFile(filePath, base64Data, "base64", (err) => {
          if (err) {
            console.error("Error saving the image:", err);
            return res.status(500).json({ message: "Error saving the image" });
          }
        });

        req.body.logo = `/uploads/logos/${fileName}`; // Save the file path in the database
      }

    const newBusiness = new Business(req.body);

    const business = await newBusiness.save();

    user.businessId = business._id;

    await user.save();
    res.status(201).json(business);
  } catch (err) {
    console.log("Error when Create Business: ", err.message);
    res.status(400).json({ message: err.message });
  }
};

// Join Existing Business
export const joinBusiness = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const business = await Business.findById(id);

    if (!business) {
      return res.status(404).json({ message: "Business Not Found" });
    }

    business.users.push(user._id);

    business.save();

    user.businessId = business._id;

    user.save();

    res.status(201).json(business);
  } catch (err) {
    console.log("Error when Join Business: ", err.message);
    res.status(400).json({ message: err.message });
  }
};

// GET Business
// seperate the logic from get single business and get business users and proposals
export const getBusiness = async (req, res) => {
  try {
    const { id } = req.params;

    const business = await Business.findById(id)
      .select("-users -proposals")
      .populate({
        path: "contactPerson",
        select: "userName, mobile, ",
        model: "User",
      });

    if (!business) {
      return res.status(404).json({ message: "Cannot find Business" });
    }
    res.status(200).json(business);
  } catch (err) {
    console.log("Error when getBusiness:", err.message);
    res.status(400).json({ message: err.message });
  }
};

// UPDATE BUSINESS
export const updateBusiness = async (req, res) => {
  const { id } = req.params;
  const updatedFields = req.body;
  const { contactPerson, newUser, logo } = req.body;

  try {
    const business = await Business.findById(id)
      .select("-users -proposals")
      .populate("users");
    if (!business) {
      return res.status(404).json({ message: "Cannot find Business" });
    }

    // // Check for a logo in the request
    // if (req.file) {
    //   const logoUrl = `/uploads/logos/${req.file.filename}`; // Save the logo path or URL
    //   updatedFields.logo = logoUrl; // Add to updated fields
    // }
    // Handle base64-encoded image
    if (logo) {
      const base64Data = logo.replace(/^data:image\/\w+;base64,/, ""); // Remove metadata prefix
      const fileType = logo.split(";")[0].split("/")[1]; // Extract file extension

      const fileName = `${Date.now()}.${fileType}`; // Generate a unique file name
      const filePath = path.join("uploads/logos/", fileName); // Define file path

      // Create directory
      const directory = path.dirname(filePath);
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
      }

      fs.writeFile(filePath, base64Data, "base64", (err) => {
        if (err) {
          console.error("Error saving the image:", err);
          return res.status(500).json({ message: "Error saving the image" });
        }
      });

      updatedFields.logo = `/uploads/logos/${fileName}`; // Save the file path in the database
    }

    if (contactPerson) {
      const contact = await User.findById(contactPerson);
      if (contact && contact.businessId.toString() === id) {
        Object.assign(business, updatedFields);
      } else {
        console.log("contact person is not valid");
        return res.status(400).json({ message: "Contact person is not valid" });
      }
    } else {
      Object.assign(business, updatedFields);
    }

    if (newUser) {
      business.users.push(newUser);
    }

    await business.save();
    res.json({
      data: business,
      message: "updated business",
    });
  } catch (err) {
    console.log("ERROR in Update Business:", err.message);
    res.status(400).json({ message: err.message });
  }
};

// GET ALL USERS OF THE BUSINESS
export const getBusinessUsers = async (req, res) => {
  try {
    const { id } = req.params;

    const business = await Business.findById(id).populate({
      path: "users",
      select: "userName email",
    });

    if (!business) {
      return res.status(404).json({ message: "Cannot find Business" });
    }

    const users = business.users;

    res.status(200).json({
      success: true,
      message: "Get business users",
      users,
    });
  } catch (err) {
    console.log("Error when get business users:", err.message);
    res.status(400).json({ message: err.message });
  }
};

// REMOVE USER FROM BUSINESS
export const removeBusinessUser = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { id } = req.params;
    const user = req.user;

    const business = await Business.findById(id).session(session);
    if (!business) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).send({ message: "Business not found" });
    }

    const userIndex = business.users.findIndex(
      (businessUser) => businessUser.toString() === user._id.toString()
    );
    if (userIndex === -1) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(404)
        .send({ message: "User not found in this business" });
    }

    business.users.splice(userIndex, 1);
    await business.save({ session });

    user.businessId = undefined;
    await user.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      success: true,
      message: "User removed from business successfully.",
    });
  } catch (error) {
    await session.abortTransaction();
    console.error("Failed to remove user from business:", error);
    res.status(500).send({ message: "Internal server error" });
  } finally {
    session.endSession();
  }
};
