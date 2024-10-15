export const roleStatusDisplay = (data, role) => {
  // Determine status message based on data status and user role

  let status = 
  (data.status === 'sent' || data.status === 'in-revision')&&
    role.roleType === 'business' && !data.clientId
      ? 'Waiting for client to accept'   
    :  (data.status === 'sent' || data.status === 'in-revision') &&
    role.roleType === 'business'
      ? 'Waiting for reply from client'
      : (data.status === 'returned' || data.status === 'returned-revision') &&
        role.roleType === 'client'
      ? 'Waiting for reply from business'
      : data.status === 'returned' && role.roleType === 'business'
      ? 'Returned from client'
      : data.status === 'sent' && role.roleType === 'client'
      ? 'Received from business'
      : data.status === 'clientSigned' && role.roleType === 'business'
      ? 'Signed by client'
      : data.status === 'clientSigned' && role.roleType === 'client'
      ? 'Waiting for business signature'
      : (data.status === 'returned-revision' && role.roleType === 'business') ||
        (data.status === 'in-revision' && role.roleType === 'client')
      ? 'In Review'
      : data.status === 'signed'
      ? 'Completed'
      : data.status === 'draft'
      ? 'Draft'
      : data?.status || ''; // Default to data status or empty string


  return status;
};
