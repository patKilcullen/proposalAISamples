import Proposal from "../models/Proposal.js";
import User from "../models/User.js";
import { generateProposal, updatePara } from "./proposalAPI.js";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import puppeteer from "puppeteer";
import { compareString } from "../utils/index.js";

import ProposalVerification from "../models/proposalVerisifaction.js";

import { proposalAuthorization } from "../middleware/proposalMiddleware.js";

const { AUTH_EMAIL, AUTH_PASSWORD, EMAIL_HOST, EMAIL_FROM } = process.env;

// let transporter = nodemailer.createTransport({
//   service: EMAIL_HOST,
//   auth: {
//     user: AUTH_EMAIL,
//     pass: AUTH_PASSWORD,
//   },
// });

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  // secure: true,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});
// GET Proposal
export const getProposal = async (req, res) => {
  try {

const proposal = req.proposal

    res.status(200).json({
      success: true,
      message: "successfully",
      data: proposal,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ROLE IN PROPOSAL
// GET User Proposals
export const getUserProposals = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).populate({
      path: "proposals",
      populate: [
        { path: "clientId", populate: { path: "businessId" } },
        { path: "businessId" },
        {
          path: "clientCollaborators",
          select: ["userName", "_id", "email", "businessId"],
        },
        {
          path: "businessCollaborators",
          select: ["userName", "_id", "email", "businessId"],
        },
        {
          path: "businessApprovers",
          select: ["userName", "_id", "email", "businessId"],
        },
        {
          path: "clientApprovers",
          select: ["userName", "_id", "email", "businessId"],
        },
      ],
    });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Contact Not Found",
      });
    }
    let proposals = user.proposals;

    res.status(200).json({
      proposals,
      success: true,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({ success: false, message: err.message });
  }
};

// GET business proposals
export const getBusinessProposals = async (req, res) => {
  try {
    const { bid } = req.params;
    const proposals = await Proposal.find({ businessId: bid })
      .populate("clientId")
      .populate("businessId");
    res.status(200).json({
      sucess: true,
      message: "successfully",
      data: proposals,
    });
  } catch (err) {
    console.log("error when getBusinessProposals", err.message);
    res.status(500).json({ message: err.message });
  }
};

// GET client proposals
export const getClientProposals = async (req, res) => {
  try {
    const { id } = req.params;
    const proposals = await Proposal.find({ clientId: id })
      .populate("businessId")
      // ROLE IN PROPOSAL
      .populate("clientId");

    res.status(200).json({
      sucess: true,
      message: "successfully",
      data: proposals,
    });
  } catch (err) {
    console.log("error when getClientProposals", err.message);
    res.status(500).json({ message: err.message });
  }
};


const testResponse =
  "[Your Name]\n[Your Title]\n[Your Company Name]\n[Your Company Address]\n[Your Company Website]\n[Your Company Email]\n[Your Company Phone Number]\n\n[Date]\n\n[Client Name]\n[Client Title]\n[Client Company Name]\n[Client Company Address]\n[Client Email]\n[Client Mobile]\n\nSubject: Business Proposal for Dog Walking and Sitting Services\n\nDear [Client Name],\n\nWe are pleased to present this business proposal on behalf of Pay Boys Business, a highly esteemed dog walking service with a proven track record of serving over 200 clients. Our previous success stories include successfully taking over another kennel and providing exceptional care to their furry companions. We are confident that our services will meet and exceed your expectations.\n\nBusiness Information:\n- Business Overview: Pay Boys Business is a professional dog walking and sitting service that offers reliable and personalized care for dogs of all breeds and sizes. Our team of experienced and passionate dog lovers ensures that each pet receives the attention, exercise, and care they need.\n- Previous Success Story: We have successfully taken over another kennel and provided top-notch care to their clients' dogs, resulting in increased customer satisfaction and loyalty.\n- Business Contact:\n   - Contact Person: [Contact Person]\n   - Business Email: [Business Email]\n   - Business Address: [Business Address]\n   - Business Website: [Business Website]\n\nClient Information:\n- Client: Jimmy Dog Kennel\n- Client Address: [Client Address]\n- Client Contact: [Client Contact]\n- Client Email: [Client Email]\n- Client Mobile: [Client Mobile]\n\nScope of Work:\nThe scope of our services includes providing comprehensive dog walking and sitting services to all the dogs at Jimmy Dog Kennel. Our experienced team will ensure that each dog receives regular exercise, companionship, and personalized care. We will also maintain detailed records of all clients' numbers and pet information for easy access and efficient management.\n\nProject Timeline:\nThe proposed project timeline is one year, during which we will provide our dog walking and sitting services to Jimmy Dog Kennel.\n\nBudget and Pricing:\nThe total budget for the project is $50,000. This includes all costs associated with providing the services, such as staff salaries, transportation, insurance, and administrative expenses. We believe this budget is fair and reasonable given the high-quality services we offer.\n\nDeliverables:\nAs part of our services, we will provide Jimmy Dog Kennel with a comprehensive document containing all clients' numbers and pet information. This document will be regularly updated and shared with you to ensure transparency and effective communication.\n\nClient Goal:\nWe understand that your goal is to provide the best possible care for the dogs at Jimmy Dog Kennel. Our services are designed to help you achieve this goal by offering reliable, professional, and personalized dog walking and sitting services.\n\nUnique Selling Position (USP):\nOur unique selling position is that we are the most profitable dog sitting service around. We achieve this by combining our passion for dogs with our business expertise, ensuring that our services are not only of the highest quality but also cost-effective and efficient.\n\nTerms and Conditions:\nWe value open communication and collaboration with our clients. We commit to listening to Jimmy Dog Kennel's specific requirements and preferences to tailor our services accordingly. We believe that by working together, we can provide the best possible care for the dogs at your kennel.\n\nClient Responsibilities:\nJimmy Dog Kennel will be responsible for providing all necessary information regarding the dogs, including their specific needs, schedules, and any special instructions. Additionally, you will be responsible for ensuring the safety and well-being of the dogs while they are in our care.\n\nWe are confident that our dog walking and sitting services will greatly benefit Jimmy Dog Kennel and its furry residents. We look forward to discussing the details of this proposal further and addressing any questions or concerns you may have.\n\nThank you for considering Pay Boys Business as your trusted partner in providing exceptional care for the dogs at Jimmy Dog Kennel. We are excited about the opportunity to work with you and contribute to the well-being of your furry companions.\n\nPlease feel free to contact us at [Your Company Email] or [Your Company Phone Number] to discuss this proposal further.\n\nSincerely,\n\n[Your Name]\n[Your Title]\n[Your Company Name]";

  // CREATE PROPOSAL
export const createProposal = async (req, res) => {
  const { businessInfo, clientInfo, proposalInfo, title } = req.body;

  const user = req.user;
  
  try {
    const businessId = user.businessId;

    const content = await generateProposal({
      businessInfo,
      clientInfo,
      proposalInfo,
      title
    });
    const newProposal = new Proposal({
      title,
      businessId: businessId,
      metadata: {
        businessInfo,
        proposalInfo,
        clientInfo,
      },
      status: "draft",
      version: {
        creator: user._id,
        versionNumber: 1,
        content: content,
      },

      created_At: Date.now(),
    });

    const proposal = await newProposal.save();

    res.status(201).json({
      sucess: true,
      message: "successfully",
      data: proposal,
    });
  } catch (err) {
    console.log("ERROR in Create Proposal: ", err.message);
    res.status(400).json({ message: err.message });
  }
};

// CREATE PROPOSAL TEST... give back hard coded proposal for faster testing
export const createProposalTest = async (req, res) => {
  const { businessInfo, clientInfo, proposalInfo, title } = req.body;

  const user = req.user;

  try {
    const businessId = user.businessId;

    const content = testResponse;
    const newProposal = new Proposal({
      title,
      businessId: businessId,
      metadata: {
        businessInfo,
        proposalInfo,
        clientInfo,
      },
      status: "draft",
      version: {
        creator: user._id,
        versionNumber: 1,
        content: content,
      },

      created_At: Date.now(),
    });

    const proposal = await newProposal.save();

    res.status(201).json({
      sucess: true,
      message: "successfully",
      data: proposal,
    });
  } catch (err) {
    console.log("ERROR in Create Proposal: ", err.message);
    res.status(400).json({ message: err.message });
  }
};

//UPDATE NEW VERSION OF PROPOSAL: keep three history versions of the proposal
export const updateExistingProposalVersion = async (req, res) => {
  const { id } = req.params;
  const { content, proposalInfo } = req.body;
  const user = req.user;

  try {
    const proposal = await Proposal.findByIdAndUpdate(id, proposalInfo, {
      new: true,
    }).populate([
      { path: "clientId" },
      { path: "businessId" },
      {
        path: "clientCollaborators",
        select: ["userName", "_id", "email", "businessId"],
      },
      {
        path: "businessCollaborators",
        select: ["userName", "_id", "email", "businessId"],
      },
      {
        path: "businessApprovers",
        select: ["userName", "_id", "email", "businessId"],
      },
      {
        path: "clientApprovers",
        select: ["userName", "_id", "email", "businessId"],
      },
      { path: "version.creator", populate: { path: "businessId" } },
    ]);

    if (!proposal) {
      return res.status(404).json({ message: "Proposal history not found" });
    }
    // UPDATED.... this doesnt work when client... should check role
    if (user.role === "user") {
      if (!user.businessId.equals(proposal.businessId)) {
        return res.status(400).json({ message: "User not authorized to edit" });
      }
    }

    const newVersion = {
      content: content,
      versionNumber: proposal.version.length + 1,
      creator: user,
      updatedAt: Date.now(),
    };

    if (proposal.version.length >= 4) {
      proposal.version.shift();
    }

    proposal.version.push(newVersion);
    proposal.updatedAt = Date.now();

    await proposal.save();


    res.status(200).json({
      sucess: true,
      message: "successfully",
      data: proposal,
    });
  } catch (error) {
    console.log("ERROR when updating proposal: ", error.message);
    res.status(400).json({ message: error.message });
  }
};


//UPDATE CURRENT VERSION OF PROPOSAL: keep three history versions of the proposal
export const updateExistingProposalVersion2 = async (req, res) => {
  const { id } = req.params;
  const { content, proposalInfo } = req.body;
  const user = req.user;

  try {
    const proposal = await Proposal.findByIdAndUpdate(id, proposalInfo, {
      new: true,
    }).populate([
      { path: "clientId" },
      { path: "businessId" },
      {
        path: "clientCollaborators",
        select: ["userName", "_id", "email", "businessId"],
      },
      {
        path: "businessCollaborators",
        select: ["userName", "_id", "email", "businessId"],
      },
      {
        path: "businessApprovers",
        select: ["userName", "_id", "email", "businessId"],
      },
      {
        path: "clientApprovers",
        select: ["userName", "_id", "email", "businessId"],
      },
      { path: "version.creator", populate: { path: "businessId" } },
    ]);

    if (!proposal) {
      return res.status(404).json({ message: "Proposal history not found" });
    }
    // UPDATED.... this doesnt work when client... should check role
    if (user.role === "user") {
      if (!user.businessId.equals(proposal.businessId)) {
        return res.status(400).json({ message: "User not authorized to edit" });
      }
    }

    const newVersion = {
      content: content,

      versionNumber: proposal.version.length + 1,
      creator: user,
      updatedAt: Date.now(),
    };

    proposal.version[proposal.version.length - 1] = newVersion;
    proposal.updatedAt = Date.now();

    await proposal.save();
    res.status(200).json({
      sucess: true,
      message: "successfully",
      data: proposal,
    });
  } catch (error) {
    console.log("ERROR when updating proposal: ", error.message);
    res.status(400).json({ message: error.message });
  }
};

// UPDATE without changing the version
export const updateProposal = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedProposal = await Proposal.findByIdAndUpdate(id, req.body, {
      new: true,
    }) // ROLE IN PROPOSAL
      .populate("businessId")
      .populate("version.creator", { populate: { path: "businessId" } })
      .populate("clientId");

    if (!updatedProposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }
    res.status(200).json({
      success: true,
      message: "Proposal updated successfully",
      proposal: updatedProposal,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res
        .status(400)
        .json({ success: false, message: "Validation error: " + err.message });
    }
    console.error("", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update para with prompt
export const updateSelectedPara = async (req, res) => {
  const { para, prompt } = req.body;
  try {
    const response = await updatePara(para, prompt);

    res.status(200).json({
      sucess: true,
      message: "successfully",
      data: response,
    });
  } catch (error) {
    console.log("ERROR when updating selected: ", error.message);
    res.status(500).json({ message: error.message });
  }
};

// generate new paragrapg
export const generateWithPrompt = async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await generate(prompt);
    res.status(200).json({
      sucess: true,
      message: "successfully",
      data: response,
    });
  } catch (error) {
    console.log("ERROR when generating with prompt: ", err.message);
    res.status(500).json({ message: err.message });
  }
};

// DELETE PROPOSAL
export const deleteProposal = async (req, res) => {
  try {
    const { id } = req.params;
    await Proposal.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

// Function to create a PDF with given content and signature
export const createProposalPDF = async (content, signature, fileName) => {
  try {
    // Define the PDF path
    const pdfPath = path.join("uploads", "pdfs", fileName);

    // Create directory
    const directory = path.dirname(pdfPath);
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    // Launch Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set the HTML content
    await page.setContent(signature, {
      waitUntil: "networkidle0",
    });

    // Create a PDF w/content
    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
    });

    // Close browser
    await browser.close();

    // Return the path to the generated PDF
    return pdfPath;
  } catch (error) {
    console.error("Error creating PDF:", error);
    throw error;
  }
};

// save pdf path in the proposal
export const saveProposalPDF = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, signature, fileName } = req.body;

    const proposal = await Proposal.findById(id);

    if (!proposal) {
      return res.status(404).send("Proposal Not Found.");
    }

    const fileNameX = fileName + ".pdf";
    const pdfPath = await createProposalPDF(content, signature, fileNameX);

    proposal.proposalUrl = pdfPath;

    await proposal.save();

    res.status(200).json({ message: "Proposal saved successfully!" });
  } catch (error) {
    console.error("Error saving proposal:");
    res.status(500).json({ error: "Error saving proposal" });
  }
};

//SEND PROPOSAL PDF as ATTACHMENT
export const sendProposalPDF = async (req, res) => {
  const { content, signature, clientEmail, businessEmail, fileName } =
    req.body.proposal;

  try {
    const pdfPath = await createProposalPDF(content, signature, fileName);
    const mailOptions = {
      // from: AUTH_EMAIL,
      from: EMAIL_FROM,
      to: [clientEmail, ...(businessEmail ? [businessEmail] : [])],
      subject: "Generated PDF Proposal from ProposalAI",
      text: "Check out the attached PDF for the signed proposal",
      attachments: [
        {
          filename: `${fileName}.pdf`,
          path: pdfPath,
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "PDF Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Error sending pdf" });
  }
};

// ADD BUSINESS COLLABORATOR
export const addBusinessCollaborator = async (req, res) => {
  try {
    const { pid } = req.params; 
    const { user } = req.body; 

    // Use $addToSet to add user to the businessCollaborators array, ensuring no duplicates
    const result = await Proposal.updateOne(
      { _id: pid },
      { $addToSet: { businessCollaborators: user._id } }
    );

    if (result.modifiedCount > 0) {
      res.status(201).json({
        success: true,
        message: "User added successfully as Business Collaborator",
        result,
      });
    } else if (result.matchedCount > 0) {
      res.status(200).json({
        success: false,
        message:
          "User was already a Business Collaborator or proposal not updated",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Proposal not found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// ADD BUSINESS APPROVER
export const addBusinessApprover = async (req, res) => {
  try {
    const { pid } = req.params; 
    const { user } = req.body; 

    const result = await Proposal.updateOne(
      { _id: pid },
      { $addToSet: { businessApprovers: user._id } }
    );

    if (result.modifiedCount > 0) {
      res.status(201).json({
        success: true,
        message: "User added successfully as Business Approver",
        result,
      });
    } else if (result.matchedCount > 0) {
      res.status(200).json({
        success: false,
        message: "User was already a Business Approver or proposal not updated",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Proposal not found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// ADD CLIENT COLLABORATOR
export const addClientCollaborator = async (req, res) => {
  try {
    const { pid } = req.params; 
    const { user } = req.body; 

    const result = await Proposal.updateOne(
      { _id: pid },
      { $addToSet: { clientCollaborators: user._id } }
    );

    if (result.modifiedCount > 0) {
      res.status(201).json({
        success: true,
        message: "User added successfully as Client Collaborator",
        result,
      });
    } else if (result.matchedCount > 0) {
      res.status(200).json({
        success: false,
        message:
          "User was already a Client Collaborator or proposal not updated",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Proposal not found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// ADD CLIENT APPROVER
export const addClientApprover = async (req, res) => {
  try {
    const { pid } = req.params; 
    const { user } = req.body; 

    const result = await Proposal.updateOne(
      { _id: pid },
      { $addToSet: { clientApprovers: user._id } }
    );

    // Check if a document was modified or matched
    if (result.modifiedCount > 0) {
      res.status(201).json({
        success: true,
        message: "User added successfully as Client Approver",
        result,
      });
    } else if (result.matchedCount > 0) {
      res.status(200).json({
        success: false,
        message: "User was already a Client Approver or proposal not updated",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Proposal not found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const verifyProposal = async (req, res) => {
  try {
    const { proposalId, token } = req.body;

    const tokenDocs = await ProposalVerification.find({ proposalId });

    if (!tokenDocs || tokenDocs.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Invalid or expired token.",
      });
    }

    let isMatch = false;
    for (const doc of tokenDocs) {
      let match = await compareString(token, doc.token);
      if (match === true) {
        isMatch = true;
      }
    }

    if (isMatch) {
      return res.status(200).json({
        status: "success",
        message: "Email verified successfully.",
      });
    } else {
      return res.status(400).json({
        status: "error",
        message: "Invalid or expired token.",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "An error occurred while verifying the email.",
    });
  }
};

// DELETE BUSINESS APPROVER
export const deleteBusinessCollaborator = async (req, res) => {
  try {
    const { pid } = req.params; 
    const { user } = req.body; 
    console.log("PPID: ", pid);
    const ass = await User.findById(pid);
    console.log("asss: ", ass);
  
    const proposal = await Proposal.findById(pid);
  
    const result = await Proposal.updateOne(
      { _id: pid },
      { $pull: { businessCollaborators: user._id } }
    );
    console.log("RESULT: ", result);

    // Check if a document was modified
    if (result.modifiedCount > 0) {
      res.status(200).json({
        success: true,
        message: "User removed successfully",
        result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Proposal or user not found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// DELETE BUSINESS APPROVER
export const deleteBusinessApprover = async (req, res) => {
  try {
    const { pid } = req.params; 
    const { user } = req.body; 

  
    const result = await Proposal.updateOne(
      { _id: pid },
      { $pull: { businessApprovers: user._id } }
    );
    // Check if a document was modified
    if (result.modifiedCount > 0) {
      res.status(200).json({
        success: true,
        message: "User removed successfully",
        result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Proposal or user not found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// DELETE BUSINESS APPROVER
export const deleteClientCollaborator = async (req, res) => {
  try {
    const { pid } = req.params; 
    const { user } = req.body; 
    console.log("PPID: ", pid);
    const ass = await User.findById(pid);
    console.log("asss: ", ass);
  
    const proposal = await Proposal.findById(pid);

  
    const result = await Proposal.updateOne(
      { _id: pid },
      { $pull: { clientCollaborators: user._id } }
    );
    console.log("RESULT: ", result);
    // Check if a document was modified
    if (result.modifiedCount > 0) {
      res.status(200).json({
        success: true,
        message: "User removed successfully",
        result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Proposal or user not found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// DELETE BUSINESS APPROVER
export const deleteClientApprover = async (req, res) => {
  try {
    const { pid } = req.params; 
    const { user } = req.body; 

  
    const result = await Proposal.updateOne(
      { _id: pid },
      { $pull: { clientApprovers: user._id } }
    );
    // Check if a document was modified
    if (result.modifiedCount > 0) {
      res.status(200).json({
        success: true,
        message: "User removed successfully",
        result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Proposal or user not found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
