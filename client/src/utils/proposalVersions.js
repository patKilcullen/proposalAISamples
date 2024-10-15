export const selectProposalVersions = (version, proposal, roleType) => {
  if (!version) return [];

  let startIndex;
  let endIndex;

  // Check for non-draft proposals with multiple versions
  if (proposal.status !== 'draft' && version.length > 1) {
    // For business in 'in-revision' or client in 'returned-revision' status
    if (
      (roleType === 'business' && proposal.status === 'in-revision') ||
      (roleType === 'client' && proposal.status === 'returned-revision')
    ) {
      startIndex = 0;
      endIndex = version.length === 4 
        ? Math.min(3, version.length) 
        : Math.min(3, version.length - 1);
    }
    // For business in 'returned-revision' or client in 'in-revision' status
    else if (
      (roleType === 'business' && proposal.status === 'returned-revision') ||
      (roleType === 'client' && proposal.status === 'in-revision')
    ) {
      startIndex = 0;
      endIndex = Math.min(4, version.length);
    }
    // For all other cases, adjust the index range accordingly
    else {
      startIndex = version.length === 4 ? 1 : 0;
      endIndex = Math.min(4, version.length);
    }

    // Return the selected slice of versions based on calculated indices
    return version.slice(startIndex, endIndex);
  } 
  // If draft or only a single version, return the whole version array
  else {
    return version;
  }
};
