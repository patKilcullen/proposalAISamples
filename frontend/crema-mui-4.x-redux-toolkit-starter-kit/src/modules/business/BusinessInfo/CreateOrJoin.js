import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Fonts } from '@crema/constants/AppEnums';

import CreateBusinessForm from './CreateBusinessForm';
import JoinBusinessForm from './JoinBusinessForm';
const CreateOrJoin = ({ values, setFieldValue }) => {
  const [selectedForm, setSelectedForm] = useState('create');

  // SELECT CREATE BUSINESS OR JOIN BUSINESS
  const handleSelectForm = (event, form) => {
    if (form !== null) {
      setSelectedForm(form);
    }
  };
  return (
    <Box>
      <Box sx={{ mr: 3 }}>
        <ToggleButtonGroup
          color='primary'
          value={selectedForm}
          exclusive
          onChange={handleSelectForm}
        >
          <ToggleButton value='create'>Create Business</ToggleButton>
          <ToggleButton value='join'>Join Business</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {selectedForm === 'create' ? (
        <CreateBusinessForm setFieldValue={setFieldValue} />
      ) : (
        <JoinBusinessForm setFieldValue={setFieldValue} />
      )}
    </Box>
  );
};

export default CreateOrJoin;



