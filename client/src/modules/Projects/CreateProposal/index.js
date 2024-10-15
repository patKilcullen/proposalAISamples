import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppGridContainer from '@crema/components/AppGridContainer';
import { Fonts } from '@crema/constants/AppEnums';
import { Box } from '@mui/material';
import ProposalContent from './Content';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';

// ACTIONS
import {
  onEditProposal,
  onSendProposal,
  onEditPartialProposal,
  onGetBusinessInfo,
  onGenerateProposal,
  onGenerateProposalTEST,
  onEditProposalRevision,
  onEditProposalCurrentVersion,
  fetchError,
  onAddProposal,
  getSingleProposal,
} from '../../../toolkit/actions';

import DOMPurify from 'dompurify';
import { useAuthUser } from '@crema/hooks/AuthHooks';
import * as yup from 'yup';

// TODO: put all test info in folder
// TEST INFO
const testInfo = {
  title: 'AI-Powered E-Commerce Solutions for Google’s Retail Platform',
  scopeOfWork: `MixCommerce will design and implement a comprehensive AI-driven e-commerce platform tailored to Google’s retail operations. The platform will focus on enhancing customer experience through personalized product recommendations, streamlined checkout processes, and advanced inventory management systems. This collaboration aims to revolutionize Google’s retail platform by leveraging AI technology for superior user engagement and optimized sales strategies.`,
  clientGoals: `1. Integrate advanced AI technologies into Google’s retail ecosystem to enhance user experience.
2. Improve conversion rates through personalized product recommendations and dynamic pricing strategies.
3. Streamline inventory management with AI-driven insights to minimize overstock and stock-outs.
4. Enhance customer loyalty and retention through a seamless, intuitive shopping experience.`,
  projectTimeline: `Phase 1: (Months 1-3)
- Research and discovery sessions with Google’s team
- Requirements gathering and system architecture design
- Initial UI/UX prototypes for review

Phase 2: (Months 4-6)
- AI algorithm development for product recommendations and pricing
- Integration of the system into Google’s platform for beta testing
- Adjustments based on feedback from internal stakeholders

Phase 3: (Months 7-9)
- Full platform deployment and live testing
- Final system optimization and user training
- Project wrap-up and support transition`,
  budgetAndPricing: `Total Estimated Cost: $1.5M
Breakdown:
- Phase 1: $350,000
- Phase 2: $600,000
- Phase 3: $550,000

The pricing includes development, implementation, and post-launch support for three months. Additional customization will be billed separately.`,
  deliverables: `1. Fully functional AI-driven e-commerce platform integrated into Google’s retail system.
2. User-friendly dashboard for managing inventory and product recommendations.
3. AI-powered recommendation and pricing algorithms tailored to user behavior.
4. Full documentation and user training for Google’s internal teams.
5. Ongoing support for three months after the project is live.`,
  uniqueSellingPosition: `MixCommerce’s unique expertise lies in the intersection of AI technology and e-commerce. With proven results in creating personalized shopping experiences and dynamic pricing solutions, MixCommerce ensures that Google’s retail operations will not only meet but exceed customer expectations. Our platform will provide real-time insights and recommendations that adapt to market trends and user behaviors, driving sales and customer engagement at an unparalleled level.`,
  termsAndConditions: `1. Payment terms: 40% upfront, 30% at mid-project milestone, 30% upon completion.
2. All intellectual property developed during this project will be owned by Google.
3. MixCommerce will provide three months of post-launch support.
4. Any additional requests outside the scope of work will be discussed and billed separately.
5. Any delays caused by third-party dependencies will not be the responsibility of MixCommerce.`,
  clientResponsibilities: `1. Provide timely feedback and approvals at each project phase.
2. Grant MixCommerce access to relevant systems and data necessary for development.
3. Designate a project manager for regular communication and decision-making.
4. Ensure internal teams are available for testing and feedback during the beta phase.`,
  previousSuccessStory: `MixCommerce partnered with a major retail brand to integrate AI technology into their e-commerce platform. Our solution increased conversion rates by 20% within the first quarter post-launch, reduced cart abandonment by 15%, and improved inventory turnover by 30%. This successful collaboration resulted in continued business growth and a long-term partnership with the client, solidifying MixCommerce’s position as a leader in AI-powered e-commerce solutions.`,
};

export const CreateProposal = ({ proposal }) => {
  const formikRef = useRef();
  const { user } = useAuthUser();
  const business = useSelector(({ business }) => business.singleBusiness);
  const userId = user._id;
  const businessId = user.businessId?._id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [validationError, setValidationError] = useState(false);
  const [validationErrorList, setValidationErrorList] = useState([]);
  const [formSection, setFormSection] = useState('businessInformation');
  const [validationSchema, setValidationSchema] = useState('');
  const [changeForm, setChangeForm] = useState(null);
  const [nextCreateBusinessForm, setNextCreateBusinessForm] = useState(false);

  // GET BUSINESS INFO on mount
  // only is businessID exists
  useEffect(() => {
    if (businessId) {
      dispatch(onGetBusinessInfo(businessId));
    }
  }, []);
  // PROPOSAL VERSION: the content of the propsal version that is being displayed and edited
  const [proposalVersion, setProposalVersion] = useState(
    proposal && proposal.version
      ? proposal.version[proposal.version.length - 1].content
      : '',
  );

  // SEND TO CLIENT send the selected proposal to the client w/user entered email addresses and marks proposal status as sent
  const [sendToClient, setSendToClient] = useState(false);
  const [allClientEmails, setAllClientEmails] = useState([]);
  const handleSendToClient = ({ clientEmails }) => {
    setAllClientEmails(clientEmails);
    setSendToClient(true);
    formikRef.current.submitForm();
  };

  // Send Client revision, updates sendProposalRevison to hit proper route(below) and updates proposal with new version
  const [sendProposalRevision, setSendProposalRevision] = useState(null);
  const handleSendProposalRevision = (status) => {
    setSendProposalRevision(status);
  };

  // Update current proposal version... set proposal route(below) to update proposal version. doesnt create a new version, only updates existing
  const [sendUpdateCurrentVersion, setSendUpdateCurrentVersion] =
    useState(false);

  const handleSendUpdateCurrentVersion = (status) => {
    setSendUpdateCurrentVersion(status);
  };

  // VALIDATION SCHEMAS
  const businessValidationSchema = yup.object({
    businessEmail: yup
      .string()
      .email('Invalid email format')
      .required('Business Email Required'),
    businessUrl: yup
      .string()
      .url('Invalid url format')
      .required('Business Url Required'),
    businessServices: yup.string().required('Business Services Required'),
    businessAddress: yup.string().required('Business Address Required'),
    businessName: yup.string().required('Business Name Required'),
    businessOverview: yup.string().required('Business Overview Required'),
    businessType: yup.string().required('Business Type Required'),
    businessIndustry: yup.string().required('Business Industry Required'),
    businessRepName: yup
      .string()
      .required('Business Representative Name Required'),
    businessRepRole: yup
      .string()
      .required('Business Representative Role Required'),
    businessRepEmail: yup
      .string()
      .email('Invalid email format')
      .required('Business Representative Email Required'),
  });

  const clientValidationSchema = yup.object({
    clientName: yup.string().required('Client Name Required'),
    clientEmail: yup
      .string()
      .email('Invalid email format')
      .required('Client Email Required'),
    clientAddress: yup.string().required('Client Address Required'),
    clientBusinessServices: yup.string().required('Client Services Required'),
    clientBusinessOverview: yup.string().required('Client Overview Required'),
    clientBusinessIndustry: yup.string().required('Client Industry Required'),
    clientBusinessType: yup.string().required('Client Business Type Required'),
    clientUrl: yup
      .string()
      .url('Invalid url format')
      .required('Client Url Required'),
    clientRepName: yup.string().required('Client Representative Name Required'),
    clientRepRole: yup.string().required('Client Representative Role Required'),
    clientRepEmail: yup
      .string()
      .email('Invalid email format')
      .required('Client Representative Email Required'),
  });

  const proposalValidationSchema = yup.object({
    title: yup.string().required('Title Required'),
    scopeOfWork: yup.string().required('Score of Work Required'),
    previousSuccessStory: yup
      .string()
      .required('Previous Success Story Required'),
    clientGoals: yup.string().required('Client Goals Required'),
    projectTimeline: yup.string().required('Project Timeline Required'),
    budgetAndPricing: yup.string().required('Budget and Pricing Required'),
    deliverables: yup.string().required('Deliverables Required'),
    uniqueSellingPosition: yup
      .string()
      .required('Unique Seling Position Required'),
    termsAndConditions: yup.string().required('Terms and Conditions Required'),
    clientResponsibilities: yup
      .string()
      .required('Client Responsibilities Required'),
  });

  // VALIDATION SCHEMA USED BASED ON FORM SECTION
  useEffect(() => {
    switch (formSection) {
      case 'businessInformation':
        setValidationSchema(businessValidationSchema);
        break;
      case 'clientInformation':
        setValidationSchema(clientValidationSchema);
        break;
      case 'proposalInformation':
        setValidationSchema(proposalValidationSchema);

        break;
      default:
        break;
    }
  }, [formSection]);

  // CHECK FORM ERRORS
  // needed to get error mesages on fields to work properly w/stepper
  // if type is next(user clicks next in create proposla stepper)
  // setNextCreateBusinessForm if true and catch form before submits, but
  // still displays error
  const checkFormErrors = async (type) => {
    if (type === 'next') {
      setNextCreateBusinessForm(true);
    }
    if (type === 'generate') {
      setNextCreateBusinessForm(false);
    }

    const errors = await formikRef.current.validateForm();

    // IF NO ERROS, change form/stepper and set Validation Error
    if (Object.keys(errors).length === 0) {
      setValidationError(false);
      setChangeForm(true);
    } else {
      setValidationErrorList([]);
      setValidationError(true);
      setChangeForm(false);
    }
    formikRef.current.submitForm();
  };

  // ADD TITLE
  const handleAddTitle = (title) => {
    let sanitizedTitle = DOMPurify.sanitize(title);
    setProposalVersion((prevVersion) => {
      return (
        `
        <!-- Add a title at the top -->
        <div style="font-size: 20px; font-weight: bold; margin-bottom: 15px;">
          ${sanitizedTitle}
        </div>
        
        <!-- Client signature section -->
        <div style="display: flex; align-items: center;">
          <label>Client Signature:</label>
          <div style="display: flex; flex-direction: column;">
            <img src=${sanitizedTitle} alt="Client Signature" />
            <div style="
              border-bottom: 1px solid black;
              width: 200px;
              margin-left: 10px;
              position: relative;
              margin-top: 15px;
            "></div>
          </div>
        </div>
      ` + prevVersion
      );
    });
  };

  return (
    <>
      <Box
        component='h2'
        variant='h2'
        sx={{
          fontSize: 16,
          color: 'text.primary',
          fontWeight: Fonts.SEMI_BOLD,
          mb: {
            xs: 6,
            sm: 8,
            md: 10,
            lg: 10,
          },
        }}
      >
        {proposal ? null : 'Create a New Proposal'}
      </Box>

      <Formik
        innerRef={formikRef}
        validateOnChange={true}
        // TEST INTIAL VALUES DO NOT DELETE... used to fill in fields when testing
        initialValues={{
          title: proposal?.title || '',
          _id: proposal?._id || '',
          businessName: proposal?.metadata?.businessInfo?.businessName || '',
          businessOverview:
            proposal?.metadata?.businessInfo?.businessOverview || '',
          businessEmail: proposal?.metadata?.businessInfo?.businessEmail || '',
          businessAddress:
            proposal?.metadata?.businessInfo?.businessAddress || '',
          businessUrl: proposal?.metadata?.businessInfo?.businessUrl || '',
          services: proposal?.metadata?.businessInfo?.services || '',
          businessRepName:
            proposal?.businessInfo?.businessRepName || testInfo.businessRepName,
          businessRepRole:
            proposal?.businessInfo?.businessRepRole || testInfo.businessRepRole,
          businessRepEmail:
            proposal?.businessInfo?.businessRepEmail ||
            testInfo.businessRepEmail,

          businessServices: proposal?.businessInfo?.businessServices || ' ',
          businessType: proposal?.businessInfo?.businessType || '',
          customIndustry: null,

          scopeOfWork:
            proposal?.metadata?.businessInfo?.scopeOfWork ||
            testInfo.scopeOfWork,
          previousSuccessStory:
            proposal?.metadata?.businessInfo?.previousSuccessStory ||
            testInfo.previousSuccessStory,
          clientGoals: proposal?.metadata?.clientGoals || testInfo.clientGoals,
          projectTimeline:
            proposal?.metadata?.projectTimeline || testInfo.timeline,
          budgetAndPricing:
            proposal?.metadata?.budgetAndPricing || testInfo.budget,
          deliverables:
            proposal?.metadata?.deliverables || testInfo.deliverables,
          uniqueSellingPosition:
            proposal?.metadata?.uniqueSellingPosition ||
            testInfo.uniqueSellingPosition,
          termsAndConditions:
            proposal?.metadata?.termsAndConditions ||
            testInfo.termsAndConditions,
          clientResponsibilities:
            proposal?.metadata?.clientResponsibilities ||
            testInfo.clientResponsibilities,

          clientName: proposal?.clientInfo?.clientName || testInfo.clientName,
          clientBusinessType:
            proposal?.clientInfo?.clientBusinessType ||
            testInfo.clientBusinessType,
          clientBusinessIndustry:
            proposal?.clientInfo?.clientBusinessIndustry ||
            testInfo.clientBusinessIndustry,
          clientBusinessOverview:
            proposal?.clientInfo?.clientBusinessOverview ||
            testInfo.clientBusinessOverview,
          clientBusinessServices:
            proposal?.clientInfo?.clientBusinessServices ||
            testInfo.clientBusinessServices,
          clientEmail:
            proposal?.clientInfo?.clientEmail || testInfo.clientEmail,
          clientAddress:
            proposal?.clientInfo?.clientAddress || testInfo.clientAddress,
          clientUrl: proposal?.clientInfo?.clientUrl || testInfo.clientUrl,
          clientRepName:
            proposal?.clientInfo?.clientRepName || testInfo.clientRepName,
          clientRepRole:
            proposal?.clientInfo?.clientRepRole || testInfo.clientRepRole,
          clientRepEmail:
            proposal?.clientInfo?.clientRepEmail || testInfo.clientRepEmail,
          customClientIndustry: null,
        }}
        // REAL INITIAL VALUES
        //         initialValues={{
        // title: proposal?.title || '',

        //           _id: proposal?._id || '',
        //           businessName: proposal?.metadata?.businessInfo?.businessName || '',
        //           businessOverview:
        //             proposal?.metadata?.businessInfo?.businessOverview || '',
        //           businessEmail: proposal?.metadata?.businessInfo?.businessEmail || '',
        //           businessAddress:
        //             proposal?.metadata?.businessInfo?.businessAddress || '',
        //           businessUrl: proposal?.metadata?.businessInfo?.businessUrl || '',
        //           businessIndustry:
        //             proposal?.metadata?.businessInfo?.businessIndustry || '',
        //           services: proposal?.metadata?.businessInfo?.services || '',
        //           businessRepName: proposal?.businessInfo?.businessRepName || '',
        //           businessRepRole: proposal?.businessInfo?.businessRepRole || '',
        //           businessRepEmail: proposal?.businessInfo?.businessRepEmail || '',

        //           businessServices: proposal?.businessInfo?.businessServices || ' ',
        //           businessType: proposal?.businessInfo?.businessType || '',

        //           customIndustry: null,

        //           scopeOfWork: proposal?.metadata?.businessInfo?.scopeOfWork || '',
        //           previousSuccessStory:
        //             proposal?.metadata?.businessInfo?.previousSuccessStory || '',
        //           clientGoals: proposal?.metadata?.clientGoals || '',
        //           projectTimeline: proposal?.metadata?.projectTimeline || '',
        //           budgetAndPricing: proposal?.metadata?.budgetAndPricing || '',
        //           deliverables: proposal?.metadata?.deliverables || '',
        //           uniqueSellingPosition:
        //             proposal?.metadata?.uniqueSellingPosition || '',
        //           termsAndConditions: proposal?.metadata?.termsAndConditions || '',
        //           clientResponsibilities:
        //             proposal?.metadata?.clientResponsibilities || '',

        //           clientName: proposal?.clientInfo?.clientName || '',
        //           clientBusinessType: proposal?.clientInfo?.clientBusinessType || '',
        //           clientBusinessIndustry:
        //             proposal?.clientInfo?.clientBusinessIndustry || '',
        //           clientBusinessOverview:
        //             proposal?.clientInfo?.clientBusinessOverview || '',
        //           clientBusinessServices:
        //             proposal?.clientInfo?.clientBusinessServices || '',
        //           clientEmail: proposal?.clientInfo?.clientEmail || '',
        //           clientAddress: proposal?.clientInfo?.clientAddress || '',
        //           clientUrl: proposal?.clientInfo?.clientUrl || '',
        //           clientRepName: proposal?.clientInfo?.clientRepName || '',
        //           clientRepRole: proposal?.clientInfo?.clientRepRole || '',
        //           clientRepEmail: proposal?.clientInfo?.clientRepEmail || '',
        //           customClientIndustry: null,

        //         }}
        // Don't validate if proposal(proposal): If there is a selevtedBlog(proposal), validationschema will have errors and prevent submitting
        validationSchema={!proposal ? validationSchema : null}
        // SUBMIT
        onSubmit={async (
          data,
          { setSubmitting, setFieldTouched, setTouched },
        ) => {
          try {
            setSubmitting(true);

            // If clicking next button on create businesss stepper,
            // form submits to check for error but stops here then
            // sets fields to not be touch so following forms work properly
            if (nextCreateBusinessForm) {
              setNextCreateBusinessForm(false);
              const touchedFields = Object.keys(data).reduce(
                (acc, field) => ({ ...acc, [field]: false }),
                {},
              );
              setTouched(touchedFields);
              return;
            }

            // EDIT PROPOSAL: INITIAL(for users editing before proposal is first sent) creates new version
            // dont run if  no proposal(proposal), or sending to client, revising, or updating current version)
            if (
              proposal &&
              !sendToClient &&
              (!sendProposalRevision || sendProposalRevision === 'draft') &&
              !sendUpdateCurrentVersion
            ) {
              dispatch(
                await onEditProposal({
                  businessId: businessId,
                  creator: userId,
                  reviewer: proposal?.reviewer || '',
                  signed: proposal?.signed || false,
                  signerId: proposal?.signerId || '',
                  proposalUrl: proposal?.proposalUrl || '',
                  _id: proposal?._id || '',
                  version: {
                    content: proposalVersion,
                  },
                  metadata: {
                    businessInfo: {
                      businessName: data?.businessName,
                      businessOverview: data?.businessOverview,
                      businessContact: data?.businessContact,
                      businessEmail: data?.businessEmail,
                      businessAddress: data?.businessAddress,
                      businessUrl: data?.businessUrl,
                      scopeOfWork: data?.scopeOfWork,
                      previousSuccessStory: data?.previousSuccessStory,
                    },
                    clientGoals: data?.clientGoals,
                    projectTimeline: data?.projectTimeline,
                    budgetAndPricing: data?.budgetAndPricing,
                    deliverables: data?.deliverables,
                    uniqueSellingPosition: data?.uniqueSellingPosition,
                    termsAndConditions: data?.termsAndConditions,
                    clientResponsibilities: data?.clientResponsibilities,
                    previousSuccessStory: data?.previousSuccessStory,
                    clientInfo: {
                      clientName: data?.clientName,
                      clientContact: data?.clientContact,
                      clientEmail: data?.clientEmail,
                      clientMobile: data?.clientMobile,
                      clientAddress: data?.clientAddress,
                    },
                  },
                }),
              );

              // GENERATE A NEW PROPOSAL
              // run if no proposal, not sending, revising, or updating existing proposal
            } else if (
              !proposal &&
              !sendToClient &&
              !sendProposalRevision &&
              !sendUpdateCurrentVersion
            ) {
              dispatch(
                onGenerateProposal({
                  title: data?.title || '',
                  businessId: businessId,
                  creator: userId,
                  signed: false,
                  businessInfo: {
                    businessName: data?.businessName || '',
                    businessOverview: data?.businessOverview || '',
                    businessContact: data?.businessContact || '',
                    businessEmail: data?.businessEmail || '',
                    businessAddress: data?.businessAddress || '',
                    businessUrl: data?.businessUrl || '',
                    businessIndustry: data?.customIndustry
                      ? data.customIndustry
                      : data.businessIndustry || '',
                    businessRepName: data.businessRepName || '',
                    businessRepRole: data.businessRepRole || '',
                    businessRepEmail: data.businessRepEmail || '',
                    businessType: data.businessType || '',
                    businessServices: data.businessServices || '',
                  },

                  proposalInfo: {
                    scopeOfWork: data?.scopeOfWork || '',
                    previousSuccessStory: data?.previousSuccessStory || '',
                    projectTimeline: data?.projectTimeline || '',
                    budgetAndPricing: data?.budgetAndPricing || '',
                    deliverables: data?.deliverables || '',
                    clientGoals: data?.clientGoals || '',
                    uniqueSellingPosition: data?.uniqueSellingPosition || '',
                    termsAndConditions: data?.termsAndConditions || '',
                    clientResponsibilities: data?.clientResponsibilities || '',
                  },
                  clientInfo: {
                    clientName: data?.clientName || '',
                    clientContact: data?.clientContact || '',
                    clientEmail: data?.clientEmail || '',
                    clientAddress: data?.clientAddress || '',
                    clientBusinessType: data?.clientBusinessType || '',
                    clientBusinessOverview: data?.clientBusinessOverview || '',
                    clientUrl: data?.clientUrl || '',
                    clientBusinessIndustry: data?.customClientIndustry
                      ? data.customClientIndustry
                      : data.clientIndustry || '',
                    clientRepName: data?.clientRepName || '',
                    clientRepRole: data?.clientRepRole || '',
                    clientRepEmail: data?.clientRepEmail || '',
                    clientBusinessServices: data.clientBusinessServices || '',
                  },
                }),
              ).then(async (res) => {
                // navigte to edit project after proposal is genereated

                if (res.payload) {
                  // ADD Proposal to User proposal array
                  try {
                    await dispatch(onAddProposal(res.payload.data));
                    navigate(`/edit-project/${res.payload.data?._id}`);
                  } catch (error) {
                    setSubmitting(false);
                    dispatch(fetchError(`Error creating proposal: ${error}`));
                  }
                } else {
                  // FETCH CONTEXT
                  dispatch(
                    fetchError(
                      `Error creating proposal: ${res.error.message} `,
                    ),
                  );
                }
              });

              // EDIT PARTIAL PROPOSAL: for first time SENDING PROPSAL
              //  for updating status to sent for and creating one proposal to show client
              // run if proposal exits, send to client is true, and not revigin or updating current version
            } else if (
              sendToClient &&
              (!sendProposalRevision || sendProposalRevision === 'draft') &&
              !sendUpdateCurrentVersion
            ) {
              try {
                await dispatch(
                  onEditPartialProposal({
                    _id: proposal?._id || '',
                    businessId: businessId,
                    creator: userId,
                    status: 'sent',
                    version: [
                      {
                        creator: userId,
                        content: proposalVersion,
                      },
                    ],
                  }),
                );

                // SEND EMAIL TO CLIENT EMAILS
                // for each email added, send the proposal
                try {
                  for (let email of allClientEmails) {
                    await dispatch(
                      onSendProposal({
                        proposal: { ...proposal, clientEmail: email },
                        role: 'client',
                      }),
                    );
                  }

                  // NAVIGATE TO SENT PROPOSAL if editing proposal and sending proposal both success
                  navigate(`/sent-project/${proposal?._id}`);
                } catch (error) {
                  // IF SENDING EMAIL FAILS, set proposal back to draft
                  await dispatch(
                    onEditPartialProposal({
                      _id: proposal?._id || '',
                      businessId: businessId,
                      creator: userId,
                      status: 'draft',
                      version: [
                        {
                          creator: userId,
                          content: proposalVersion,
                        },
                      ],
                    }),
                  );

                  setSubmitting(false);

                  dispatch(fetchError(error));
                }
              } catch (error) {
                setSubmitting(false);
                dispatch(fetchError(`Error Sending Proposal: ${error}`));
              }

              // EDIT REVISION: for user and client when editing and updating status
              // WHEN HIT EDIT BUTTIN
              //  `business/proposal/update-version/${proposalInfo._id}`,
            } else if (sendProposalRevision && !sendUpdateCurrentVersion) {
              await dispatch(
                onEditProposalRevision({
                  proposalInfo: {
                    status: sendProposalRevision,
                    pid: data?._id,
                    uid: userId,
                    _id: data._id,
                    creator: userId,
                  },
                  content: proposalVersion,
                }),
              )
                .then(() => {
                  dispatch(getSingleProposal(data?._id));
                  navigate(navigate(`/sent-project/${proposal._id}`));
                })
                .catch((error) => {
                  debugger;
                });

              // If updating current version, hit the action to update the curent proposal version
              // WHEN SENDING/ACEPTING(as business)
              //  `business/proposal/update-version2/${proposalInfo._id}`;
            } else if (sendUpdateCurrentVersion) {
              dispatch(
                onEditProposalCurrentVersion({
                  proposalInfo: {
                    status: sendUpdateCurrentVersion,
                    pid: data._id,
                    uid: userId,
                    _id: data._id,
                    creator: userId,
                  },
                  content: proposalVersion,
                }),
              )
                .then(() => {
                  navigate(navigate(`/sent-project/${proposal._id}`));
                })
                .catch((error) => {
                  dispatch(fetchError(`Error Sending Proposal: ${error}`));

                  setSubmitting(false);
                });
            }

            setSubmitting(false);
          } catch (error) {
            setSubmitting(false);
          }
        }}
      >
        {({ setFieldValue }) => (
          <Form noValidate autoComplete='off'>
            <AppGridContainer>
              <ProposalContent
                setProposalVersion={setProposalVersion}
                content={proposal ? proposal : ''}
                setFieldValue={setFieldValue}
                sendToClient={handleSendToClient}
                selectedProposal={proposalVersion}
                businessInfo={business}
                // handleCheckErrors={handleCheckErrors}
                validationError={validationError}
                handleSendProposalRevision={handleSendProposalRevision}
                handleSendUpdateCurrentVersion={handleSendUpdateCurrentVersion}
                setFormSection={setFormSection}
                changeForm={changeForm}
                checkFormErrors={checkFormErrors}
                setChangeForm={setChangeForm}
                validationErrorList={validationErrorList}
                setSendToClient={setSendToClient}
              />
            </AppGridContainer>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateProposal;
