import passwordReset from "../models/passwordReset.js";
import { hashString } from "./index.js";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import Verification from "../models/emailVerification.js";
import ProposalVerification from "../models/proposalVerisifaction.js";
import { generateAndStoreOtp } from "./index.js";

dotenv.config();

const { APP_URL, EMAIL_FROM } = process.env;

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// SEND VERIFICATION EMAIL
export const sendVerificationEmail = async (user, res) => {
  const { _id, email, userName } = user;

  const token = _id + uuidv4();

  const link = APP_URL + "/users/verify/" + _id + "/" + token;

  //   mail options
  const mailOptions = {
    from: EMAIL_FROM,
    to: email,
    subject: "Welcome to ProposalAI - Registration Successful",
    html: `<div
    style='font-family: Arial, sans-serif; font-size: 20px; color: #333; background-color: #f7f7f7; padding: 20px; border-radius: 5px;'>
    
    <hr>
    <h4>Dear ${userName},</h4>
    <p>
    Welcome to ProposalAI! We're thrilled to have you on board.
    To get started, please click the following link to activate your account:
  
    <a href="${link}" style="color: #007bff; text-decoration: none;">Click here to verify your email address</a>
  
    <br><br> <!-- Adding some space -->
  
    If you have any questions or need assistance, feel free to reach out to our support team at support@mixcommerce.co.
    </p>
    <div style="margin-top: 20px;">
        <h5>Best regards,</h5>
        <h5>The ProposalAI Team</h5>
    </div>
</div>`,
  };

  try {
    const hashedToken = await hashString(token);

    // check if verification exists, if so, delete
    const verficationExists = await Verification.findOne({ userId: _id });
    if (verficationExists) {
      await Verification.deleteMany({ userId: _id });
    }

    await Verification.create({
      userId: _id,
      token: hashedToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });

    await transporter.sendMail(mailOptions);
    return { success: true, message: "Verification email sent successfully." };
  } catch (error) {
    console.error("Error sending verification email:", error);
    return { success: false, message: "Failed to send verification email." };
  }
};

//SEND ACCOUNT ACTIVATION EMAIL
export const sendAccountActivation = async (user, res) => {
  const { userName, email } = user;

  const mailOptions = {
    from: EMAIL_FROM,
    to: email,
    subject: "Account Activated - Let's Propose and Sign Faster",
    html: `<html>
      <body>
        <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333; background-color: #f7f7f7; padding: 20px; border-radius: 5px;">
          <p>Dear ${userName},</p>
      
          <p>Congratulations! Your ProposalAI account is now activated. Get ready to revolutionize your proposal workflow and streamline the signing process.</p>
          <p>Log in now to explore the features and start preparing and signing proposals with ease.</p>
      
          <p>If you have any questions, our support team is here to help at <a href="mailto:support@mixcommerce.co">support@mixcommerce.co</a>.</p>
      
          
          <div style="margin-top: 20px;">
            <h5>Best regards,</h5>
            <h5>The ProposalAI Team</h5>
          </div>
      
          <p style="font-size: 14px;"><b>Note: This link expires in 10 minutes.</b></p>
        </div>
      </body>
      </html>
      >`,
  };

  return transporter
    .sendMail(mailOptions)
    .then(() => ({
      success: true,
      message: "Account activation email sent",
    }))
    .catch((err) => {
      console.error(err);
      throw new Error("Something went wrong with sending activation email");
    });
};

// RESET PASSWORD LINK
export const resetPasswordLink = async (user, res) => {
  const { _id, email, userName } = user;

  const token = _id + uuidv4();

  const link = APP_URL + ":4000/users/reset-password/" + _id + "/" + token;

  const mailOptions = {
    from: EMAIL_FROM,
    to: email,
    subject: "Reset Your ProposalAI Password",
    html: `<p style="font-family: Arial, sans-serif; font-size: 16px; color: #333; background-color: #f7f7f7; padding: 20px; border-radius: 5px;">  
            Dear ${userName},
            We received a request to reset your ProposalAI password. If you initiated this request, please follow the link below to reset your password:
            
    
            Note: If you are unable to click the URL then copy the text URL shared below and open it in a web browser.
            Text URL: <a href=${link} style="color: #fff; padding: 10px; text-decoration: none; background-color: #000;  border-radius: 8px; font-size: 18px; ">Reset Password</a>.

            
            If you didn't request a password reset, please ignore this email.
            For any assistance, contact our support team at support@mixcommerce.co.
            Best regards,
            The ProposalAI Team
      
          <br>
          <p style="font-size: 18px;"><b>This link expires in 10 minutes</b></p>
           <br>
          
      </p>`,
  };

  try {
    const hashedToken = await hashString(token);

    const resetEmail = await passwordReset.create({
      userId: _id,
      email: email,
      token: hashedToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 600000,
    });

    if (resetEmail) {
      transporter
        .sendMail(mailOptions)
        .then(() => {
          res.status(201).send({
            success: "PENDING",
            message: "Reset Password Link has been sent to your account.",
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(404).json({ message: "Something went wrong" });
        });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};

// SEND ONE TIME PASSWORD
export const sendOneTimePassword = async (user, res) => {
  const { _id, email, userName } = user;
  // console.log("EMAIL: ", email)
  try {
    const otp = await generateAndStoreOtp(_id);
    const mailOptions = {
      from: EMAIL_FROM,
      to: "patrickjkilcullen@gmail.com",
      // to: email,
      subject: "Your Proposal AI Password",
      html: `<p style="font-family: Arial, sans-serif; font-size: 16px; color: #333; background-color: #f7f7f7; padding: 20px; border-radius: 5px;">  
            Dear ${userName},
            Here is your One Time Password for Proposal AI: ${otp}
            
    
            
            If you didn't request a one time password, please ignore this email.
            For any assistance, contact our support team at support@mixcommerce.co.
            Best regards,
            The ProposalAI Team
      
          <br>
          <p style="font-size: 18px;"><b>This link expires in 10 minutes</b></p>
           <br>
          
      </p>`,
    };

    if (otp) {
      await transporter.sendMail(mailOptions);

      return {
        success: true,
        message: "Verification email sent successfully.",
      };
    }
  } catch (error) {
    console.log(error);
    return "something went wrong";
  }
};

// SEND PROPOSAL LINK
export const sendProposalLink = async (req, res) => {
  const { proposal, role } = req.body;
  const token = proposal._id + uuidv4();
  try {
    const { clientEmail } = proposal;
    const { clientName } = proposal.metadata.clientInfo;
    const { businessName } = proposal.metadata.businessInfo;
    const url = `${process.env.APP_URL}/accept-proposal/${role}/${proposal._id}/${token}`;

    const mailOptions = {
      from: EMAIL_FROM,
      to: clientEmail,
      subject: `New Proposal Created on ProposalAI`,
      html: `<p>Dear ${clientName}, a proposal has been created on ProposalAI for your review by the ${businessName}.<br>
      Click the following link to review: <a href="${url}">${url}</a><br>
      Please sign up or log in to your account to view the details and provide any necessary input.<br>
      Thank you,<br>
      ProposalAI Team</p>`,
    };

    const hashedToken = await hashString(token);

    await ProposalVerification.create({
      proposalId: proposal._id,
      token: hashedToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });

    const info = await transporter.sendMail(mailOptions);

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error sending proposal link" });
  }
};

// SEND  INVITE LINK
export const sendProposalInvite = async (req, res) => {
  const { proposal, role, clientName, clientEmail } = req.body;

  const token = proposal._id + uuidv4();
  try {
    const { businessName } = proposal.metadata.businessInfo;

    const url = `${process.env.APP_URL}/accept-proposal/${role}/${proposal._id}/${token}`;

    const mailOptions = {
      from: EMAIL_FROM,
      to: clientEmail,
      subject: `New Proposal Invitiation at ProposalAI`,
      html: `<p>Dear ${clientName}, you've been invited by ${businessName} to work on a proposal at ProposalAI.<br>
      Click the following link to review: <a href="${url}">${url}</a><br>
      Please sign up or log in to your account to view the details and provide any necessary input.<br>
      Thank you,<br>
      ProposalAI Team</p>`,
    };

    const hashedToken = await hashString(token);

    await ProposalVerification.create({
      proposalId: proposal._id,
      token: hashedToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });

    const info = await transporter.sendMail(mailOptions);

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error sending proposal link" });
  }
};

// SEND  INVITE LINK
export const sendSupportMessage = async (req, res) => {
  const { message, subject } = req.body;
  const user = req.user;

  try {
    const mailOptions = {
      from: EMAIL_FROM,
      to: EMAIL_FROM,
      subject: `${subject}`,
      html: `<p>${user.userName} at ${user.email} sent the following message, .<br>
    ${message}</p>`,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error sending proposal link" });
  }
};
