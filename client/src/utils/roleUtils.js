export const getRoles = (proposal, user) => {
  let calculatedRole = 'unknown';

  // Return 'unknown' if proposal status or user is not defined
  if (!proposal.status || !user) {
    return calculatedRole;
  }

  // Check if the user is a client admin
  if (user?._id === proposal?.clientId?._id) {
    calculatedRole = {
      role: 'clientAdmin',
      displayRole: 'Client Administrator',
      roleType: 'client',
    };
  }
  // Check if the user is a business admin
  else if (
    (proposal?.businessId?._id === user?.businessId?._id ||
      proposal?.businessId?._id === user?.businessId) &&
    proposal?.businessId?._id !== 'undefined' &&
    user?.businessId?._id !== 'undefined'
  ) {
    calculatedRole = {
      role: 'businessAdmin',
      displayRole: 'Business Administrator',
      roleType: 'business',
    };
  }
  // Check if the user is a business approver
  else if (
    proposal?.businessApprovers?.some((approver) => approver._id === user._id)
  ) {
    calculatedRole = {
      role: 'businessApprover',
      displayRole: 'Business Approver',
      roleType: 'business',
    };
  }
  // Check if the user is a business collaborator
  else if (
    proposal?.businessCollaborators?.some(
      (collaborator) => collaborator._id === user._id,
    )
  ) {
    calculatedRole = {
      role: 'businessCollaborator',
      displayRole: 'Business Collaborator',
      roleType: 'business',
    };
  }
  // Check if the user is a client approver
  else if (
    proposal?.clientApprovers?.some((approver) => approver._id === user._id)
  ) {
    calculatedRole = {
      role: 'clientApprover',
      displayRole: 'Client Approver',
      roleType: 'client',
    };
  }
  // Check if the user is a client collaborator
  else if (
    proposal?.clientCollaborators?.some(
      (collaborator) => collaborator._id === user._id,
    )
  ) {
    calculatedRole = {
      role: 'clientCollaborator',
      displayRole: 'Client Collaborator',
      roleType: 'client',
    };
  }

  // Return the calculated role
  return calculatedRole;
};
