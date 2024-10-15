import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSingleProposal,
  onSavePdf,
  onSendPdf,
  onEditProposalRevision,
  onEditProposalCurrentVersion,
  fetchError,
  onEditPartialProposal
} from 'toolkit/actions';
import { removeProposal } from '../../../toolkit/reducers/Proposals';
import ReactHtmlParser from 'react-html-parser';
import AppLoader from '@crema/components/AppLoader';
import AppAnimate from '@crema/components/AppAnimate';
import AppCard from '@crema/components/AppCard';
import { useAuthUser } from '@crema/hooks/AuthHooks';
import { Box} from '@mui/material';
import { Fonts } from '@crema/constants/AppEnums';
import AppInfoView from '@crema/components/AppInfoView';
import DOMPurify from 'dompurify';
import { getRoles } from '../../../utils/roleUtils';
import { selectProposalVersions } from '../../../utils/proposalVersions';
import { formatDate } from 'utils/formatDate';
import AppsContainer from '@crema/components/AppsContainer';
import AppGridContainer from '@crema/components/AppGridContainer';
import SentProposalSideMenu from './SentProposalSideMenu';
import ProposalTitle from 'modules/Components/ProposalTitle';
import {handleAddClientSignatureHTML, handleAddBusinessSignatureHTML} from './SignatureHTML'

const SentProposal = () => {
  const { user } = useAuthUser();
  const { pid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, message,} = useSelector(({ common }) => common);
  const proposal = useSelector(({ proposals }) => proposals.proposal);
  const contentRef = useRef(null);
  const { version } = proposal || {};
  const [role, setRole] = useState('');
  const [displayRole, setDisplayRole] = useState('');
  const [roleType, setRoleType] = useState(''); //determines whether buisnes or client


// USER ROLE
  const memoizedRole = useMemo(
    () => getRoles(proposal, user),
    [proposal, user],
  );

  useEffect(() => {
    setRole(memoizedRole.role);
    setDisplayRole(memoizedRole.displayRole);
    setRoleType(memoizedRole.roleType);
  }, [memoizedRole]);


  // POPOSAL VERSIONS: all versions, using useMemo to avoid rerendering.  Depending on whether client or business
  // and the status of proposal, show all or all but last versions.  If other party(client or biz) is editing, then do not show last version
  const [proposalVersions, setProposalVersions] = useState([]);
  useEffect(() => {
    const proposalVersionsFiltered = selectProposalVersions(
      version,
      proposal,
      roleType,
    );
    setProposalVersions(proposalVersionsFiltered);
  }, [version, proposal?.status]);

  // SELECTER VERSION NUMBER: to displaay previous version via toggle... changes when proposalVersions changes
  const [selectedVersionNum, setSelectedVersionNum] = useState(0);
  useEffect(() => {
    setSelectedVersionNum(proposalVersions.length - 1);
  }, [proposalVersions]);

  // CHANGE VERSION/VERSION NUMBER
  const handleSelectVersion = (version) => {
    setSelectedVersionNum(version);
  };

  // PROPOSAL VERSION: the current version being rendered, as well as the creator, changes when version number changes
  const [proposalVersion, setProposalVersion] = useState('');
  useEffect(() => {
    if (proposalVersions.length > 0) {
      setProposalVersion(proposalVersions[selectedVersionNum]?.content || '');
    }
  }, [selectedVersionNum, proposalVersions]);

  //  GET PROPOSAL,  check if is exists in params,
  // if undefined, useParams is string "undefined", so check for it(may not be necessary any more)
  useEffect(() => {
    if (pid && pid !== 'undefined') {
      dispatch(getSingleProposal(pid)).then((res)=>{
 
        if(res?.response?.status === 403){
          navigate('/error-pages/error-403')
        }
      });
    }
    return () => {
      dispatch(removeProposal());
     
    };
  }, [dispatch, pid]);




  // SUBMIT/COMPLETE SIGNED PROPOSAL
  const handleSumbitProposal = async () => {
    try {
      const proposalResponse = await dispatch(getSingleProposal(pid));
      if (contentRef.current) {
        const htmlContent = contentRef.current.innerHTML;
        try {
          // SAVE PDF
          await dispatch(
            onSavePdf({
              signature: htmlContent,
              fileName: proposal._id,
              content: htmlContent,
              id: proposal._id,
            }),
          );

          try {
            // SEND PDF
            await dispatch(
              onSendPdf({
                signature: htmlContent,
                clientEmail: proposal?.clientId?.email,
                businessEmail: proposal?.businessId.email,
                content: htmlContent,
                fileName: proposal._id,
              }),
            );

            try {
              // UPDATE PROPOSAL
              await dispatch(
                onEditProposalCurrentVersion({
                  proposalInfo: {
                    pid: proposal._id,
                    _id: proposal._id,
                    status: 'signed',
                    businessSignerId: user._id,
                    updatedAt: Date.now(),
                    signature: htmlContent,
                  },
                  content: htmlContent,
                }),
              );

              // Get proposal after updated to immediately display correct information
              await dispatch(getSingleProposal(pid));
            } catch (error) {
              dispatch(fetchError('Error Updating Proposal PDF: ' + error));
            }
          } catch (error) {
            dispatch(fetchError('Error Sending Proposal PDF: ' + error));
          }
        } catch (error) {
          console.error('Error saving PDF:', error);
          dispatch(fetchError('Error Saving Proposal PDF: ' + error));
        }
      }
    } catch (error) {
      dispatch(fetchError('Error Fetching Proposal: ' + error));
    }
  };

  // UPDATE SIGN
  // ADD CLIENT SIGNATURE
  const handleSendClientSignature = () => {
    dispatch(getSingleProposal(pid)).then(async (res) => {
      if (contentRef.current) {
        const htmlContent = contentRef.current.innerHTML;

        try {
          await dispatch(
            onEditProposalCurrentVersion({
              proposalInfo: {
                pid: proposal._id,
                _id: proposal._id,
                status: 'clientSigned',
                clientSignerId: user._id,
                updatedAt: Date.now(),
                signature: htmlContent,
              },
              content: htmlContent,
            }),
          );

          navigate(`/sent-project/${proposal._id}`);
        } catch (error) {
          dispatch(fetchError('Send New OPT: Error Sending Signature.'));
        }
      }
    });
  };

  // CLIENT EDIT
  // Let client edit proposal.. changes status to in-revision, makes a copy of the proposal for client to edits, and nafvigates to edit-project page
  const handleClientEdit = async () => {
    dispatch(
      onEditProposalRevision({
        proposalInfo: {
          status: 'in-revision',
          pid: proposal._id,
          uid: user._id,
          _id: proposal._id,
          creator: user._id,
        },
        content: proposal.version[proposal.version.length - 1].content,
      }),
    )
      .then(() => {
        navigate(`/edit-project/${proposal._id}`);
      })
      .catch((error) => {
        dispatch(fetchError(error));
      });
  };

  // CLIENT SIGNATURE
  const handleAddClientSignature = ({signature, type}) => {
   
    resetSignature();
    // const date = new Date();
    // const formattedDate = formatDate(date);
    // let sanitizedSignature = DOMPurify.sanitize(signature);
    let html = handleAddClientSignatureHTML({signature, type, user})

    setProposalVersion((prevVersion) => {
      return (
        prevVersion + html
          
      );
    });
  };

  // BUSINESS SIGNATURE
  const handleAddBusinessSignature = ({signature, type}) => {
    resetSignature();
     let html = handleAddBusinessSignatureHTML({signature, type, user})
    setProposalVersion((prevVersion) => {
      return (
         prevVersion + html
      );
    });
  };
  
  // RESET SIGNATURE - removes sintaure from proposal content
  const resetSignature = () => {
    setProposalVersion(proposalVersions[selectedVersionNum]?.content || '');
  };

  // OPEN OTP TIMER (needs to be in hte grandparent component)
  const [openTimer, setOpenTimer] = useState(false);

  return loading ? (
    <AppLoader message={message} />
  ) : // depending on on who(user or client) is on page and waht the current proposal status is, stay on page or navigate to sent -proposal
  ((proposal.status === 'returned' ||
      proposal.status === 'returned-revision' ||
      proposal.status === 'draft') &&
      roleType === 'business') ||
    (roleType === 'client' && proposal.status === 'in-revision') ? (
    navigate(`/edit-project/${proposal._id}`)
  ) : (
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
        {proposal.status === 'signed' ? 'Signed Proposal' : 'Sent Proposal'}
      </Box>
      <AppGridContainer>
        <AppsContainer
          rowReverse={true}
          sidebarContent={
            <SentProposalSideMenu
              proposal={proposal}
              role={role}
              selectedVersionNum={selectedVersionNum}
              proposalVersions={proposalVersions}
              handleSelectVersion={handleSelectVersion}
              status={status}
              displayRole={displayRole}
              handleClientEdit={handleClientEdit}
              handleSumbitProposal={handleSumbitProposal}
              handleSendClientSignature={handleSendClientSignature}
              proposalVersion={proposalVersion}
              handleAddClientSignature={handleAddClientSignature}
              handleAddBusinessSignature={handleAddBusinessSignature}
              resetSignature={resetSignature}
              openTimer={openTimer}
              setOpenTimer={setOpenTimer}
              roleType={roleType}
            />
          }
        >
          <AppAnimate animation='transition.slideUpIn'>
            <AppCard sx={{ overflow: 'auto' }}
            >
              {/* TITLE */}
                 {proposal.title &&   
         <ProposalTitle title={proposal.title} id={proposal._id} role={role} />}

              <Box
                sx={{
                  border: '1px solid gray',

                  borderRadius: '10px',
                }}
              >
                {/* PROPOSAL CONTENT */}
                <Box
                  ref={contentRef}
                  sx={{
                    padding: '15px',
                    overflow: 'auto',
                    my: 2,
                  }}
                >
                  {ReactHtmlParser(proposalVersion)}
                </Box>
              </Box>
            </AppCard>
            <AppInfoView />
          </AppAnimate>
        </AppsContainer>
      </AppGridContainer>
    </>
  );
};

export default SentProposal;
