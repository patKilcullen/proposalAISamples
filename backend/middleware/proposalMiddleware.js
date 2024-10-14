import Proposal from "../models/Proposal.js";


import { compareString } from "../utils/index.js";

import ProposalVerification from "../models/proposalVerisifaction.js";


const userProposalAuthorization = (proposal, user) => {
  // CHECK IF USER IS ASSOCAITED WITH PROPOSAL

  return (
    proposal?.clientId?._id?.toString() === user?._id.toString() ||
    // Check if the user is listed in the client collaborators
    proposal?.clientCollaborators?.some(
      (collaborator) => collaborator?._id.toString() === user?._id.toString()
    ) ||
    // Check if the user is listed in the client approvers
    proposal?.clientApprovers?.some(
      (approver) => approver?._id.toString() === user?._id.toString()
    ) ||
    // Check if the user is listed in the business collaborators
    proposal?.businessCollaborators?.some(
      (collaborator) => collaborator?._id.toString() === user?._id.toString()
    ) ||
    // Check if the user is listed in the business approvers
    proposal?.businessApprovers?.some(
      (approver) => approver?._id.toString() === user?._id.toString()
    ) ||
    // Check if the user's business ID matches the proposal's business ID
    (proposal?.businessId?._id &&
      proposal?.businessId?._id.toString() === user?.businessId?._id.toString())

  );
};


export const proposalAuthorization = async (req, res, next) => {
  try {
    const { pid } = req.params; // Extract proposal ID from the request parameters
    const user = req.user; // Extract authenticated user from the request
    const { token } = req.query; // Extract token from the query parameters

    // Fetch the proposal with all related fields populated
    const proposal = await Proposal.findById(pid).populate([
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
      { path: "version.creator", populate: { path: "businessId" } },
      { path: "clientSignerId", populate: { path: "businessId" } },
      { path: "businessSignerId", populate: { path: "businessId" } },
    ]);

    // If the proposal is not found, return 404
    if (!proposal) {
      return res.status(404).json({ message: "Proposal Not Found" });
    }

    const isUserAssociated = userProposalAuthorization(proposal, user);
    // If the user is associated, proceed to the next middleware or route handler
    if (isUserAssociated) {
      req.proposal = proposal; 
      return next();
    }

    // If user is not associated, check if a valid token is provided
    if (token !== "undefined") {
      const tokenDocs = await ProposalVerification.find({ proposalId: pid });

      // If no tokens are found for this proposal, return 400
      if (!tokenDocs || tokenDocs.length === 0) {
        return res.status(400).json({
          status: "error",
          message: "Invalid or expired token.",
        });
      }

      // Verify if any token matches
      let isMatch = false;
      for (const doc of tokenDocs) {
        let match = await compareString(token, doc.token);
        if (match === true) {
          isMatch = true;
          break; // Exit loop if a matching token is found
        }
      }

      // If a matching token is found, grant access
      if (isMatch) {
        req.proposal = proposal; 
        return next();
      } else {
        // If no valid token is found, return 400
        return res.status(400).json({
          status: "error",
          message: "Invalid or expired token.",
        });
      }
    }

    // If neither the user is associated nor a valid token is provided, return 403 Forbidden
    return res
      .status(403)
      .json({ message: "You do not have access to this proposal" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};
