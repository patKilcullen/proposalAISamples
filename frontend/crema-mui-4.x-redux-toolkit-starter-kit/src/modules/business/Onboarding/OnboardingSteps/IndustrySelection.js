import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useAuthUser } from '@crema/hooks/AuthHooks';
import {  Form } from 'formik';
import * as yup from 'yup';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/material';
import AppTextField from '@crema/components/AppFormComponents/AppTextField';



const IndustrySelection = (
  {

    selectedIndustry,
    setSelectedIndustry,
    formikRef
  },
  ref,
) => {

  const { user } = useAuthUser();



  // TODO ADD INDUSTRIES FOLDER TO BE USED throughout app
  //  Industries
  const predefinedIndustries = [
    'Consulting Services',
    'Construction and Engineering',
    'Information Technology (IT)',
    'Marketing and Advertising',
    'Education and Training',
    'Healthcare and Medical Services',
    'Real Estate',
    'Government Contracts',
    'Financial Services',
    'Nonprofit and NGO Sector',
    'Legal Services',
    'Hospitality and Tourism',
    'Manufacturing',
    'Retail',
    'Telecommunications',
    'Energy and Utilities',
    'Transportation and Logistics',
    'Agriculture and Food Production',
    'Entertainment and Media',
    'Environmental Services',
  ];

  // DISPLAY INDUSTRIES: industried that are displayed
  const [displayIndustries, setDisplayIndustries] = useState([]);

  // SET DISPLAY INDUSTRIES: if user already has industry, add it to industries and display, otherwise display instutried
  useEffect(() => {
    if (!predefinedIndustries.includes(user.businessId?.industry)) {
      setDisplayIndustries([
        ...predefinedIndustries,
        user.businessId?.industry,
      ]);
    } else {
      setDisplayIndustries([...predefinedIndustries]);
    }
  }, []);

 
  return (
    <div>
              <Form>
                <Box>
                  <Box component='p' sx={{ fontSize: 16 }}>
                    Industry
                  </Box>

                  <Select
                    label='Industry'
                    name='industry'
                    variant='outlined'
                    value={
                      !selectedIndustry
                        ? user.businessId?.industry
                        : selectedIndustry
                    }
                    onChange={(e) => {
                      setSelectedIndustry(e.target.value);
                      formikRef.current.setFieldValue(
                        'industry',
                        e.target.value,
                      );
                    }}
                    sx={{
                      width: '100%',
                      '& .MuiInputBase-input': {
                        fontSize: 14,
                      },
                    }}
                  >
                    {/* MAP THROUHG I  industries to display menu items */}
                    {displayIndustries
                      ? displayIndustries.map((industry) => (
                          <MenuItem key={industry} value={industry}>
                            {industry}
                          </MenuItem>
                        ))
                      : null}
                    <MenuItem value='other'>Other</MenuItem>
                  </Select>
                  {selectedIndustry === 'other' && (
                    <AppTextField
                      label='Enter your industry'
                      name='customIndustry'
                      variant='outlined'
                      sx={{
                        width: '100%',
                        '& .MuiInputBase-input': {
                          fontSize: 14,
                        },
                      }}
                    />
                  )}
                </Box>
              </Form>

    </div>
  );
};
// );

export default IndustrySelection;
