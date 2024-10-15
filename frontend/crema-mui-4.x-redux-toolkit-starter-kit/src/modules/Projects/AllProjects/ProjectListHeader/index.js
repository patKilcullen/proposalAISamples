import React, { useState } from 'react';
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useIntl } from 'react-intl';
import AppSearchBar from '@crema/components/AppSearchBar';

const ProjectContentHeader = (props) => {
  const {
    filterText,
    setFilterText,
    handleChange,
    alignment,
    activeProjects,
    completedProjects,
  } = props;
  const { messages } = useIntl();


  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
      }}
    >
      <>
        <Box sx={{ mr: 3 }}>
          <AppSearchBar
            iconPosition='right'
            overlap={false}
            value={filterText}
            onChange={(event) => setFilterText(event.target.value)}
            placeholder={messages['common.searchHere']}
          />
        </Box>

        {/* TOGGLE BUTTONS for different proposal status types */}
        {completedProjects ? null : (
          <Box sx={{ mr: 3 }}>
            <ToggleButtonGroup
              color='primary'
              value={alignment}
              exclusive
              onChange={handleChange}
            >
              <ToggleButton value='all'>All</ToggleButton>
              <ToggleButton value='draft'>Drafts</ToggleButton>
              <ToggleButton value='sent'>Sent</ToggleButton>
              {/* Dont display signed and rejected toggles is on active projects page */}
              <ToggleButton value='in-review'>In Review</ToggleButton>
              {activeProjects ? null : (
                <ToggleButton value='signed'>Signed</ToggleButton>
              )}
            </ToggleButtonGroup>
          </Box>
        )}
      </>
    </Box>
  );
};

export default ProjectContentHeader;
