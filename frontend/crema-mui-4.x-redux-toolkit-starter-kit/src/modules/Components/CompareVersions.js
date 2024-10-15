import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import CompareDiffDisplay from './CompareDiffDisplay';

const CompareVersions = ({ proposalVersions }) => {
  const [compareDiffs, setCompareDiffs] = useState(false);

  return (
    <Box sx={{ display: 'flex', margin: 0 }}>
      <Button sx={{ fontSize: '14px' }} onClick={() => setCompareDiffs(true)}>
        (Compare)
      </Button>

      {/* COMPARE DIFFS MODAL */}
      <CompareDiffDisplay
        compareDiffs={compareDiffs}
        setCompareDiffs={setCompareDiffs}
        proposalVersions={proposalVersions}
        oldVersion={proposalVersions?.length - 2}
        newVersion={proposalVersions?.length - 1}
      />
    </Box>
  );
};

export default CompareVersions;
