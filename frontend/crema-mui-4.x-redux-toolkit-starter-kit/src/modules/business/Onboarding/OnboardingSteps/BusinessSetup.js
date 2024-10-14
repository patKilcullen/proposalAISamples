import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthUser } from '@crema/hooks/AuthHooks';
import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import AppCard from '@crema/components/AppCard';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import AppAnimate from '@crema/components/AppAnimate';
import { Box } from '@mui/material';
import AppLoader from '@crema/components/AppLoader';
import AppTextField from '@crema/components/AppFormComponents/AppTextField';
import { onEditPartialBusiness, onCreateBusiness, onGetBusinessInfo } from '../../../../toolkit/actions';
import IntlMessages from '@crema/helpers/IntlMessages';
import AppComponentHeader from '@crema/components/AppComponentHeader';
import UploadLogo from 'modules/Components/reactDropzone/UploadLogo';
import IndustrySelection from './IndustrySelection'
import { useJWTAuthActions } from '@crema/services/auth/jwt-auth/JWTAuthProvider';
import Avatar from '@mui/material/Avatar';
import FormHelperText from '@mui/material/FormHelperText'
const validationSchema = yup.object({
  businessName: yup.string().required('Business Name Required'),
  businessEmail: yup
    .string()
    .email('Invalid email format')
    .required('Email Required'),
  businessUrl: yup.string().url('Invalid Url format').required('Url Required'),
  services: yup.string().required('Services Required'),
  businessAddress: yup.string().required('Address Required'),
  businessOverview: yup.string().trim().required('Overview Required'),
  businessType: yup.string().required('Business Type Required'),
  industry: yup.string().required(' Industry Required'),
  businessRepName: yup.string().required('Required'),
  businessRepRole: yup.string().required('Required'),
  businessRepEmail: yup
    .string()
    .email('Invalid email format')
    .required('Required'),
});

const BusinessSetup = (
  {
    onboardingSave,
    setOnboardingSave,
    businessInfo,
    handleNext,
    setFormError,
    setFormErrors,
    setActiveStep,

  },
  ref,
) => {
  const formikRef = useRef();
  const { user } = useAuthUser();
  const dispatch = useDispatch();
  const business = useSelector(({ business }) => business.singleBusiness);
  const { loading, hideMessage } = useSelector(({ common }) => common);
  const [selectedIndustry, setSelectedIndustry] = useState(null);

 const { getAuthUser } = useJWTAuthActions();

  // ERROR MESSAGE HELPER for industry because Crema AppSelectFrield doesnt work wi "other" dropdown
  // and regualr Select needs ErrorMessage component
  const errorHelper = ({ children }) => (
    <FormHelperText style={{ color: '#d32f2f' }}>{children}</FormHelperText>
  );

  // set formik to invlaid on mount
  // unless information is already present(which will allow them to just click next if fields pre-filled)
  useEffect(() => {
    if (
      formikRef.current &&
      !user?.businessId?.businessName &&
      !user?.businessId?.email &&
      formikRef.current &&
      !business?.businessOverview &&
      !business?.businessType &&
      !business?.businessServices &&
      !business?.url &&
      !business?.address &&
      !business?.taxId &&
      !business?.industry &&
          !business?.businessRepName &&
          !business?.businessRepRole &&
          !business?.businessRepEmail 
    ) {
      formikRef.current.setErrors({
        // ~
        businessName: 'Business Name Required',
        businessEmail: 'Business Email Required',
        // ~
        businessOverview: 'Overview Required',
        businessType: 'Business Type Required',
        services: 'Services Required',
        businessURL: 'URL Required',
        businessAddress: 'Address Required',
        // taxId: 'Tax Id Required',
        industry: 'Industry Required',
        businessRepName: 'Business Representative Name Required',
        businessRepRole: 'Business Representative Role Required',
        businessRepEmail: 'Business Representative Email Required',
      });
    }
  }, []);


  // BUSINESS LOGO: if logo included, encode it before saving
   const [businessLogo, setBusinessLogo] = useState(null);
const [businessLogoEncoded, setBusinessLogoEncoded] = useState(null)
 
  useEffect(()=>{
    if(businessLogo?.length > 0){
handleFileChange(businessLogo)
    }
  },[businessLogo])

   const handleFileChange = (logo) => {
  
     const file = logo[0];
    if (file) {
      // Convert the file to a base64 string
      const reader = new FileReader();
      reader.onloadend = () => {
        setBusinessLogoEncoded(reader.result); // Set the base64 string
      };
      reader.readAsDataURL(file); // Read the file as a base64 string
    }
  };


 

    useEffect(() => {
    const handleFormSubmission = async () => {
   
      if (onboardingSave === true) {
        const errors = await formikRef.current.validateForm();
 await formikRef.current.submitForm();
        // IF industry is other and field empty, throw errr
        if (
          formikRef.current.values.industry === 'other' &&
          formikRef.current.values.customIndustry === null
        ) {
        //  setFormErrors([]);
          setFormError(true);
          // setFormErrors([...Object.values(errors), 'Industry Required']);

        } else {
          if (Object.keys(errors).length === 0) {
            await formikRef.current.submitForm();
            handleNext();
            setFormError(false);
            // setFormErrors([]);
          } else {
                // setFormErrors([]);
            setFormError(true);
            // setFormErrors(Object.values(errors));
          }
        }
      }
      setOnboardingSave(false);
    };

    handleFormSubmission();
  }, [onboardingSave]);


 

  const onEditBusiness = async (
    values,
    { setSubmitting, submitForm, setFieldValue },
  ) => {
    setSubmitting(true);

    try {
//  ROLE IN PROPOSAL
if(!user.businessId){
  try{

      await dispatch(
        onCreateBusiness({
          email: values.businessEmail,
          businessName: values.businessName,
          address: values.businessAddress,
          businessOverview: values.businessOverview,
          businessType: values.businessType,
          url: values.businessUrl,
          businessServices: values.services,
          userId: user._id,
          _id: user.businessId?._id,
          industry:
            values.industry === 'other'
              ? values.customIndustry
              : values.industry,
          businessRepName: values.businessRepName,
          businessRepRole: values.businessRepRole,
          businessRepEmail: values.businessRepEmail,
          logo: businessLogoEncoded || null,
          tin: values.tin,
        }),
      )

  }catch(error){
    // If error creating business, dont move onto next step
  setActiveStep(prev => prev -1)
  throw error
  }
      
      
      ;}else{
 
      await dispatch(
        onEditPartialBusiness({
          email: values.businessEmail,
          businessName: values.businessName,
          address: values.businessAddress,
          businessOverview: values.businessOverview,
          businessType: values.businessType,
          url: values.businessUrl,
          businessServices: values.services,
          userId: user._id,
          _id: user.businessId?._id,
          industry:
            values.industry === 'other'
              ? values.customIndustry
              : values.industry,
          businessRepName: values.businessRepName,
          businessRepRole: values.businessRepRole,
          businessRepEmail: values.businessRepEmail,
          logo: businessLogoEncoded || null,
          tin: values.tin || null,
        }),
      );
      }
      //  hideMessage();
    } catch (error) {

      console.error('Error during onSubmit:', error);
    } finally {
      getAuthUser()
      setSubmitting(false);
    }
  };





  return (
    <div>
      {loading ? (
        <AppLoader />
      ) : (
        <>
          <AppComponentHeader
            title='Profile Setup'
            description='enter your basic business information...'
          />
        
          <Formik
            validateOnBlur={true}
            validateOnChange={true}   
            initialValues={{
              businessEmail: user?.businessId?.email
                ? user?.businessId?.email
                : null,
              businessName: user?.businessId?.businessName
                ? user?.businessId?.businessName
                : null,
              businessAddress: business?.address ? business?.address : null,
              services: business?.businessServices ? business?.businessServices : null,
              businessOverview: business?.businessOverview
                ? business?.businessOverview
                : null,
              businessType: business?.businessType
                ? business?.businessType
                : null,
              businessUrl: business?.url ? business?.url : null,
              _id: user._id,
              industry: user.businessId?.industry
                ? user.businessId?.industry
                : null,
              customIndustry: null,
              businessRepName: business?.businessRepName
                ? business?.businessRepName
                : null,
              businessRepRole: business?.businessRepRole
                ? business?.businessRepRole
                : null,
              businessRepEmail: business?.businessRepEmail
                ? business?.businessRepEmail
                : null,
                 tin: business?.tin
                ? business?.tin
                : null,
            }}
            validationSchema={validationSchema}
            onSubmit={onEditBusiness}
            innerRef={formikRef}
          >
            <AppAnimate animation='transition.slideUpIn'>
              <Form noValidate autoComplete='off'
          
              >
                <AppCard>
                  {/* ~ */}
                  <Box component='p' sx={{ fontSize: 16 ,}}>
                    Business Name
                  </Box>
                  <AppTextField
                    name='businessName'
                    variant='outlined'
                    sx={{
                      width: '100%',
                      my: 2,
                    }}
                    placeholder='business name'
                    // value={businessInfo ? businessInfo.services : null}
                    // onChange={(e) => setFieldValue('services', e.target.value)}
                  />
  
                  <Box component='p' sx={{ fontSize: 16 }}>
                    Business Email
                  </Box>
                  <AppTextField
                    name='businessEmail'
                    variant='outlined'
                    sx={{
                      width: '100%',
                      my: 2,
                    }}
                    placeholder='business email'
                    // value={businessInfo ? businessInfo.services : null}
                    // onChange={(e) => setFieldValue('services', e.target.value)}
                  />
                  {/* ~ */}
                  <Box component='p' sx={{ fontSize: 16 }}>
                    Business Type
                  </Box>
                  <Select
                    name='businessType'
                    variant='outlined'
                    sx={{
                      width: '100%',
                      my: 2,
                    }}
                    defaultValue={
                      business?.businessType ? business?.businessType : ''
                    }
                    onChange={(e) => {
                      formikRef.current.setFieldValue(
                        'businessType',
                        e.target.value,
                      );
                    }}
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
                'businessType'
              }
              component={errorHelper}
            /></Box>


                  <IndustrySelection
                    onboardingSave={onboardingSave}
                    handleNext={handleNext}
                    setOnboardingSave={setOnboardingSave}
                    setFormError={setFormError}
                    selectedIndustry={selectedIndustry}
                    setSelectedIndustry={setSelectedIndustry}
                    formikRef={formikRef}
                  />

             <Box sx={{ ml: 4}}> 
 <ErrorMessage 
              name={
                'industry'
              }
              component={errorHelper}
            /></Box>
                  <Box component='p' sx={{ mt: 3, fontSize: 16 }}>
                    Overview
                  </Box>
                  <AppTextField
                    multiline
                    name='businessOverview'
                    variant='outlined'
                    rows={4}
                    sx={{
                      width: '100%',
                      my: 2,
                    }}
                    placeholder='Business Overview'
                    value={businessInfo ? businessInfo.businessOverview : ''}
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
                    name='services'
                    variant='outlined'
                    sx={{
                      width: '100%',
                      my: 2,
                    }}
                    placeholder='services'
                    value={businessInfo ? businessInfo.businessServices : null}
                  />

                  <Box component='p' sx={{ fontSize: 16 }}>
                    Address
                  </Box>
                  <AppTextField
                    name='businessAddress'
                    variant='outlined'
                    sx={{
                      width: '100%',
                      my: 2,
                    }}
                    placeholder='Business Address'
                    value={businessInfo ? businessInfo.address : ''}
                  />

                  <Box component='p' sx={{ fontSize: 16 }}>
                    URL
                  </Box>
                  <AppTextField
                    name='businessUrl'
                    variant='outlined'
                    sx={{
                      width: '100%',
                      my: 2,
                    }}
                    placeholder='Business URL'
                    value={businessInfo ? businessInfo.url : ''}
                  />
                  <Box component='p' sx={{ fontSize: 16 }}>
                    Tax Identification Number(TIN){' '}
                    <Box component='p' sx={{ fontSize: 16, color: 'grey' }}>
                      (optional)
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
                  />
                </AppCard>
                <AppCard title='Business Representative'>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      flexWrap: 'wrap',
                    }}
                  >
                    <Box>
                      <Box component='p' sx={{ fontSize: 16 }}>
                        Name
                      </Box>
                      <AppTextField
                        name='businessRepName'
                        value={businessInfo?.businessRepName || ''}
                        variant='outlined'
                        sx={{
                          width: '125%',
                          my: 2,
                        }}
                        placeholder='Rep Name'
                        // value={businessInfo ? businessInfo.url : ''}
                        // onChange={(e) =>
                        //   setFieldValue(
                        //     clientBusiness
                        //       ? 'clientRepName'
                        //       : 'businessRepName',
                        //     e.target.value,
                        //   )
                        // }
                        // disabled={businessInfo && !editMode}
                      />
                    </Box>
                    <Box>
                      <Box component='p' sx={{ fontSize: 16 }}>
                        Role
                      </Box>
                      <AppTextField
                        name='businessRepRole'
                        variant='outlined'
                        sx={{
                          width: '125%',
                          my: 2,
                        }}
                        placeholder='Rep Role'
                        // value={businessInfo ? businessInfo.url : ''}
                        // onChange={(e) =>
                        //   setFieldValue(
                        //     clientBusiness
                        //       ? 'clientRepRole'
                        //       : 'businessRepRole',
                        //     e.target.value,
                        //   )
                        // }
                        // disabled={businessInfo && !editMode}
                      />
                    </Box>
                    <Box>
                      <Box component='p' sx={{ fontSize: 16 }}>
                        Email
                      </Box>
                      <AppTextField
                        name='businessRepEmail'
                        variant='outlined'
                        sx={{
                          width: '125%',
                          my: 2,
                        }}
                        placeholder='Rep Email'
                        // value={businessInfo ? businessInfo.url : ''}
                        // onChange={(e) =>
                        //   setFieldValue(
                        //     clientBusiness
                        //       ? 'clientRepEmail'
                        //       : 'businessRepEmail',
                        //     e.target.value,
                        //   )
                        // }
                        // disabled={businessInfo && !editMode}
                      />
                    </Box>
                  </Box>
                </AppCard>
              </Form>
            </AppAnimate>
   
          </Formik>
                
        </>
      )}
 {business && business.logo && (
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
                      src={`${process.env.REACT_APP_SERVER_URL}${business.logo}`}
                    />
                  </Box>
                </Box>
              )}
      <Box component='p' sx={{ fontSize: 16, marginTop: '15px' }}>
        Upload Business Logo (optional):
      </Box>
      <UploadLogo setBusinessLogo={setBusinessLogo} />
    </div>
  );
};
// );

export default BusinessSetup;
