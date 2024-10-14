import React, { useEffect, useState, useRef } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import IntlMessages from '@crema/helpers/IntlMessages';
import { Form, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import AppTextField from '@crema/components/AppFormComponents/AppTextField';
import AppSelectField from '@crema/components/AppFormComponents/AppSelectField';
import EditIcon from '@mui/icons-material/Edit';

import { Fonts } from '@crema/constants/AppEnums';

import AppCard from '@crema/components/AppCard';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import AppAnimate from '@crema/components/AppAnimate';

import { useAuthUser } from '@crema/hooks/AuthHooks';

import AppInfoView from '@crema/components/AppInfoView';
import FormHelperText from '@mui/material/FormHelperText';

import UploadLogo from 'modules/Components/reactDropzone/UploadLogo';

import Avatar from '@mui/material/Avatar';
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

const CreateBusinessForm = ({
  setFieldValue,
  businessInfo,
  editMode,
  toggleEditMode,
  createProposal,
  changeProposalBusinessInfo,
  setChangeProposalBusinessInfo,
  clientBusiness,
  setBusinessLogo,
}) => {
  const { user } = useAuthUser();
  const componentRef = useRef(null);

  // Scroll to the top of the component when it mounts
  // needed when switching steps in creat proposal
  useEffect(() => {
    componentRef.current.scrollTop = 0;
  }, []);

  // if business already exists, prefill the form fields with its data
  useEffect(() => {
    // Update form values when proposalBusinessInfo(from create proposal) changes
    if (!changeProposalBusinessInfo && !clientBusiness) {
      setFieldValue(
        'businessName',
         businessInfo ? businessInfo.businessName : '',
       
      );
      setFieldValue(
        'businessType',
        businessInfo ? businessInfo.businessType : '',
      );
      setFieldValue(
        'businessIndustry',
        businessInfo ? businessInfo.industry : '',
      );
      setFieldValue(
        'businessOverview',
        businessInfo ? businessInfo.businessOverview : '',
      );
      setFieldValue(
        'businessServices',
        businessInfo ? businessInfo.businessServices : '',
      );
      setFieldValue('businessEmail', businessInfo ? businessInfo.email : '');
      setFieldValue(
        'businessAddress',
        businessInfo ? businessInfo.address : '',
      );
      setFieldValue('businessUrl', businessInfo ? businessInfo.url : '');
      setFieldValue(
        'businessType',
        businessInfo ? businessInfo.businessType : '',
      );
      setFieldValue(
        'businessRepName',
        businessInfo ? businessInfo.businessRepName : '',
      );
      setFieldValue(
        'businessRepRole',
        businessInfo ? businessInfo.businessRepRole : '',
      );
      setFieldValue(
        'businessRepEmail',
        businessInfo ? businessInfo.businessRepEmail : '',
      );
      setFieldValue(
        'tin',
        businessInfo ? businessInfo.tin : '',
      );
    }
  }, [businessInfo, setFieldValue]);

  // DISPLAY INDUSTRIES: industried that are displayed
  const [displayIndustries, setDisplayIndustries] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState(null);

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

  // ERROR MESSAGE HELPER for industry because Crema AppSelectFrield doesnt work wi "other" dropdown
  // and regualr Select needs ErrorMessage component
  const errorHelper = ({ children }) => (
    <FormHelperText style={{ color: '#d32f2f' }}>{children}</FormHelperText>
  );

  return (
    // <AppAnimate animation='transition.slideUpIn'>
    <>
      <Form
        ref={componentRef}
        style={{
          overflowY: 'auto',
          height: '90vh',
          // width: '50vw',
          minWidth: createProposal && '50vw',
        }}
        noValidate
        autoComplete='off'
      >
        <Box
          sx={{
            //  position: 'absolute',
            marginLeft: '87%',
            marginTop: !businessInfo && !createProposal ? '10px' : '-10px',
          }}
        >
          {/* EDIT BUTTON: display if business already exists  and user is admin*/}
          {(businessInfo && createProposal) ||
          (businessInfo && !createProposal && user.role[0] === 'admin') ? (
            <Box
              style={{
                width: '100%',
                // position: businessInfo && !createProposal ? 'absolute' : "relative",
                display: 'flex',
                justifuContent: 'flex-end',
              }}
            >
              <Tooltip title='Edit business info.'>
                <Button
                  sx={{
                    ml: businessInfo
                      ? '0'
                      : { xs: 0, sm: '65vw', md: '75%', lg: '80%' },
                    // marginTop:
                    // businessInfo && !createProposal ? '40px' : '40px',
                    marginTop: '40px',
                    height: '40px',
                  }}
                  color='primary'
                  variant='outlined'
                  // if not creating proposal. just turn on edit mode,
                  // else turn on edit mode and turn on changeProposalBusinessInfo
                  onClick={() => {
                    if (!createProposal) {
                      toggleEditMode();
                    } else {
                      toggleEditMode();
                      setChangeProposalBusinessInfo(true);
                    }
                  }}
                >
                  <EditIcon />
                </Button>
              </Tooltip>
            </Box>
          ) : null}
        </Box>

        {/* If business already associated with user, display info, otherwise create business */}
        <AppCard
          title={
            businessInfo
              ? 'My Business Information'
              : clientBusiness
              ? 'Client Business Information'
              : 'Create Business'
          }
        >
          <Box>
            <Typography
              component='h3'
              sx={{
                color: 'red',
                fontSize: 16,

                mb: { xs: 3, lg: 4 },
              }}
            >
              {/* When user is accesing form to create proposal and editMode is on, inform user edit only apply to proposal */}
              {createProposal && editMode
                ? 'Edits to will only apply to the business information used in the proposal.'
                : null}
            </Typography>
            <Box component='p' sx={{ fontSize: 16 }}>
              Business Name
            </Box>
            <AppTextField
              name={clientBusiness ? 'clientName' : 'businessName'}
              variant='outlined'
              sx={{
                width: '100%',
                my: 2,
              }}
              placeholder='Business Name'
              value={businessInfo?.businessName || ''}
              onChange={(e) =>
                setFieldValue(
                  clientBusiness ? 'clientName' : 'businessName',
                  e.target.value,
                )
              }
              disabled={businessInfo && !editMode}
            />
            <Box component='p' sx={{ fontSize: 16 }}>
              Business Type
            </Box>
            <Select
              name={clientBusiness ? 'clientBusinessType' : 'businessType'}
              variant='outlined'
              sx={{
                width: '100%',
                my: 2,
              }}
              defaultValue={businessInfo ? businessInfo.businessType : ''}
              onChange={(e) => {
                const fieldName = clientBusiness
                  ? 'clientBusinessType'
                  : 'businessType';
                const value = e.target.value;
                setFieldValue(fieldName, value);
              }}
            
              disabled={businessInfo && !editMode}
            >
              <MenuItem value='Sole Proprietorship'>
                Sole Proprietorship
              </MenuItem>
              <MenuItem value='Partnership (General Partnership or Limited Partnership)'>
                Partnership (General Partnership or Limited Partnership)
              </MenuItem>

              <MenuItem value='Limited Liability Company (LLC)'>
                Limited Liability Company (LLC)
              </MenuItem>
              <MenuItem value='Corporation (C-Corporation or S-Corporation)'>
                Corporation (C-Corporation or S-Corporation)
              </MenuItem>

              <MenuItem value='Nonprofit Corporation'>
                Nonprofit Corporation
              </MenuItem>
              <MenuItem value='Cooperative'>Cooperative</MenuItem>

              <MenuItem value='Professional Corporation (PC)'>
                Professional Corporation (PC)
              </MenuItem>
              <MenuItem value='Benefit Corporation'>
                Benefit Corporation
              </MenuItem>
                 
            
            </Select>
 <Box sx={{ mt:-2, ml: 4}}> 
 <ErrorMessage 
              name={
               clientBusiness ? 'clientBusinessType' : 'businessType'
              }
              component={errorHelper}
            /></Box>
            <Box component='p' sx={{ fontSize: 16 }}>
              Industry
            </Box>

            <Select
              label='Industry'
              // name='industry'
              name={
                clientBusiness ? 'clientBusinessIndustry' : 'businessIndustry'
              }
              variant='outlined'
              value={
                !selectedIndustry && !clientBusiness
                  ? user.businessId?.industry
                  : selectedIndustry
              }
              // defaultValue={!clientBusiness && !selectedIndustry ? user?.businessId?.industry : ""}
              defaultValue={
                !clientBusiness && !selectedIndustry
                  ? user?.businessId?.industry
                  : selectedIndustry
              }
              onChange={(e) => {
                setSelectedIndustry(e.target.value);
                setFieldValue(
                  clientBusiness
                    ? 'clientBusinessIndustry'
                    : 'businessIndustry',
                  e.target.value,
                );
              }}
              sx={{
                width: '100%',
                '& .MuiInputBase-input': {
                  fontSize: 14,
                },
              }}
              disabled={businessInfo && !editMode}
            >
              {/* MAP THROUHG Industries to display menu items */}
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
                name={
                  clientBusiness ? 'customClientIndustry' : 'customIndustry'
                }
                variant='outlined'
                sx={{
                  width: '100%',
                  '& .MuiInputBase-input': {
                    fontSize: 14,
                  },
                }}
              />
            )}
            <Box sx={{ ml: 4}}> 
            <ErrorMessage
              name={
                clientBusiness ? 'clientBusinessIndustry' : 'businessIndustry'
              }
              component={errorHelper}
            />
</Box>
            <Box component='p' sx={{ mt: 3, fontSize: 16 }}>
              Overview
            </Box>
            <AppTextField
              multiline
              name={
                clientBusiness ? 'clientBusinessOverview' : 'businessOverview'
              }
              variant='outlined'
              rows={4}
              sx={{
                width: '100%',
                my: 2,
              }}
              placeholder='Business Overview'
              value={businessInfo ? businessInfo.businessOverview : ''}
              onChange={(e) =>
                setFieldValue(
                  clientBusiness
                    ? 'clientBusinessOverview'
                    : 'businessOverview',
                  e.target.value,
                )
              }
              disabled={businessInfo && !editMode}
            />
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <Box component='p' sx={{ fontSize: 16 }}>
                Services
              </Box>
              <Box component='p' sx={{ fontSize: 16, color: 'grey.500' }}>
                {' '}
                (seperate services by commas)
              </Box>
            </Box>
            <AppTextField
              name={
                clientBusiness ? 'clientBusinessServices' : 'businessServices'
              }
              variant='outlined'
              sx={{
                width: '100%',
                my: 2,
              }}
              placeholder='services'
              value={businessInfo ? businessInfo.businessServices : null}
              onChange={(e) =>
                setFieldValue(
                  clientBusiness
                    ? 'clientBusinessServices'
                    : 'businessServices',
                  e.target.value,
                )
              }
              disabled={businessInfo && !editMode}
            />

            <Box component='p' sx={{ fontSize: 16 }}>
              Email
            </Box>
            <AppTextField
              name={clientBusiness ? 'clientEmail' : 'businessEmail'}
              variant='outlined'
              sx={{
                width: '100%',
                my: 2,
              }}
              placeholder='Business Email'
              value={businessInfo ? businessInfo.email : ''}
              onChange={(e) =>
                setFieldValue(
                  clientBusiness ? 'clientEmail' : 'businessEmail',
                  e.target.value,
                )
              }
              // can edit if in edit mode but not if creating proposal
              disabled={(businessInfo && !editMode) || createProposal}
            />

            <Box component='p' sx={{ fontSize: 16 }}>
              Address
            </Box>
            <AppTextField
              name={clientBusiness ? 'clientAddress' : 'businessAddress'}
              variant='outlined'
              sx={{
                width: '100%',
                my: 2,
              }}
              placeholder='Business Address'
              value={businessInfo ? businessInfo.address : ''}
              onChange={(e) =>
                setFieldValue(
                  clientBusiness ? 'clientAddress' : 'businessAddress',
                  e.target.value,
                )
              }
              disabled={(businessInfo && !editMode) || createProposal}
            />

            <Box component='p' sx={{ fontSize: 16 }}>
              URL
            </Box>
            <AppTextField
              name={clientBusiness ? 'clientUrl' : 'businessUrl'}
              variant='outlined'
              sx={{
                width: '100%',
                my: 2,
              }}
              placeholder='Business URL'
              value={businessInfo ? businessInfo.url : ''}
              onChange={(e) =>
                setFieldValue(
                  clientBusiness ? 'clientUrl' : 'businessUrl',
                  e.target.value,
                )
              }
              disabled={businessInfo && !editMode}
            />

            {!createProposal && !clientBusiness && <><Box component='p' sx={{ fontSize: 16 }}>
                    Tax Identification Number(TIN){' '}
                    <Box component='p' sx={{ fontSize: 16, color: 'grey' }}>
                    </Box>
                  </Box>
                  <AppTextField
                    name='tin'
                    variant='outlined'
                    sx={{
                      width: '100%',
                      my: 2,
                    }}
                    placeholder='tax id'
                      disabled={businessInfo && !editMode}
                  /></>}

            {/* REPRESENTATIVE INFORMATIOM */}

            <AppCard
              title={
                clientBusiness
                  ? 'Client Representative'
                  : 'Business Representative'
              }
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  // createProposal || clientBusiness ? 'row' : 'column',
                  // gap: createProposal || clientBusiness ? '80px' : '10px',
                  gap: '10px',
                  flexWrap: 'wrap',
                  width: '80%',
                }}
              >
                <Box>
                  <Box component='p' sx={{ fontSize: 16 }}>
                    Name
                  </Box>
                  <AppTextField
                    name={clientBusiness ? 'clientRepName' : 'businessRepName'}
                    value={businessInfo?.businessRepName || ''}
                    variant='outlined'
                    sx={{
                      width: '125%',
                      my: 2,
                    }}
                    placeholder='Rep Name'
                    // value={businessInfo ? businessInfo.url : ''}
                    onChange={(e) =>
                      setFieldValue(
                        clientBusiness ? 'clientRepName' : 'businessRepName',
                        e.target.value,
                      )
                    }
                    disabled={businessInfo && !editMode}
                  />
                </Box>
                <Box>
                  <Box component='p' sx={{ fontSize: 16 }}>
                    Role
                  </Box>
                  <AppTextField
                    name={clientBusiness ? 'clientRepRole' : 'businessRepRole'}
                    variant='outlined'
                    sx={{
                      width: '125%',
                      my: 2,
                    }}
                    placeholder='Rep Role'
                    // value={businessInfo ? businessInfo.url : ''}
                    onChange={(e) =>
                      setFieldValue(
                        clientBusiness ? 'clientRepRole' : 'businessRepRole',
                        e.target.value,
                      )
                    }
                    disabled={businessInfo && !editMode}
                  />
                </Box>
                <Box>
                  <Box component='p' sx={{ fontSize: 16 }}>
                    Email
                  </Box>
                  <AppTextField
                    name={
                      clientBusiness ? 'clientRepEmail' : 'businessRepEmail'
                    }
                    variant='outlined'
                    sx={{
                      width: '125%',
                      my: 2,
                    }}
                    placeholder='Rep Email'
                    // value={businessInfo ? businessInfo.url : ''}
                    onChange={(e) =>
                      setFieldValue(
                        clientBusiness ? 'clientRepEmail' : 'businessRepEmail',
                        e.target.value,
                      )
                    }
                    disabled={businessInfo && !editMode}
                  />
                </Box>
              </Box>
              {businessInfo?.logo && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    position: 'relative',
                    my: 5
                  }}
                >
                  <Box component='p' sx={{ fontSize: 16 }}>
                    Logo
                  </Box>
                  <Box
                    sx={{
                      // display: 'flex',
                      // justifyContent: 'center',
                      // flexGrow: 1,
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 100,
                        height: 100,
                        mb: 2.5,
                        alignSelf: 'center',
                      }}
                      src={`${process.env.REACT_APP_SERVER_URL}${businessInfo.logo}`}
                    />
                  </Box>
                </Box>
              )}
            </AppCard>
            {!createProposal && !clientBusiness && (
              <Box component='p' sx={{ fontSize: 16, marginTop: '15px' }}>
                Upload Business Logo:
                <UploadLogo setBusinessLogo={setBusinessLogo} />
              </Box>
            )}
          </Box>
        </AppCard>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {/* SAVE/CREATE BUTTON: display if not creating proposal */}
          {!createProposal && !clientBusiness ? (
            <Button
              sx={{
                position: 'relative',
                minWidth: 100,
                ml: businessInfo
                  ? { xs: '60vw', sm: '45vw', md: '65%', lg: '80%' }
                  : null,
              }}
              color='primary'
              variant='contained'
              type='submit'
              disabled={businessInfo && !editMode}
            >
              <IntlMessages
                id={businessInfo ? 'common.saveChanges' : 'create'}
              />
            </Button>
          ) : null}
        </Box>
        {!createProposal && <AppInfoView />}
      </Form>
    </>
  );
};

export default CreateBusinessForm;

CreateBusinessForm.propTypes = {
  setFieldValue: PropTypes.func,
  values: PropTypes.object,
};
