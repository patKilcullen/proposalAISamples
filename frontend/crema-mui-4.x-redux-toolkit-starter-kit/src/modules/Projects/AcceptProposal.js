import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthUser } from '@crema/hooks/AuthHooks';
import {
  getSingleProposal,
  onEditPartialProposal,
  fetchError,
  onAddProposal,
  onAddBusinessCollaborator,
  onAddBusinessApprover,
  onAddClientCollaborator,
  onAddClientApprover,
  verifyProposal,
  onDeleteBusinessCollaborator,
  onDeleteBusinessApprover,
  onDeleteClientCollaborator,
  onDeleteClientApprover,
} from '../../toolkit/actions';
import AppCard from '@crema/components/AppCard';
import { Box, Button, Typography } from '@mui/material';
import { Fonts } from '@crema/constants/AppEnums';
import AppLoader from '@crema/components/AppLoader';
import AppInfoView from '@crema/components/AppInfoView';
import ReactHtmlParser from 'react-html-parser';
import AppConfirmDialog from '@crema/components/AppConfirmDialog';
import { getRoles } from 'utils/roleUtils';

const AcceptProposal = () => {
  const { user } = useAuthUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pid, role, token } = useParams();
  const proposal = useSelector(({ proposals }) => proposals.proposal);
  const [businessName, setBusinessName] = useState('');
  const [proposalPreview, setProposalPreview] = useState('');
  const { loading } = useSelector(({ common }) => common);
  const [userRole, setUserRole] = useState({
    role: '',
    displayRole: '',
    roleType: '',
  });
  const [newRole, setNewRole] = useState('');
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    displayNewRole(); // set role title to be dispalyed
    dispatch(getSingleProposal(pid, token)); //get Proposal
  }, []);

  // NEW ROLE DISPLAY... het role from useParams(role signing up for) and get full title
  const displayNewRole = () => {
    if (role === 'client') {
      setNewRole('Client Administrator');
    }
    if (role === 'businessCollaborator') {
      setNewRole('Business Collaborator');
    }
    if (role === 'businessApprover') {
      setNewRole('Business Approver');
    }
    if (role === 'clientCollaborator') {
      setNewRole('Client Collaborator');
    }
    if (role === 'clientApprover') {
      setNewRole('Client Approver');
    }
  };

  // GET EXISTING ROLEgets potential existing role information bases on user id and proposal info
  useEffect(() => {
    const { role, displayRole, roleType } = getRoles(proposal, user);
    setUserRole({ role, displayRole, roleType });
    checkClient(); //check if proposal has cleint and sign up is for client
  }, [proposal]);

  // if on clinet sign up page and client exists, set clientExists to true to show warning.
  const [clientExists, setCleintExists] = useState(false);
  const checkClient = () => {
    if (role === 'client' && proposal.clientId) {
      setCleintExists(true);
    }
  };

  // GET BUINSENESS NAME AND PROPOSAL PREVIEw to display
  useEffect(() => {
    if (proposal) {
      setBusinessName(proposal?.businessId?.businessName);
      if (proposal?.version) {
        setProposalPreview(proposal?.version[0]?.content);
      }
    }
  }, [proposal]);

  // ACCEPT PROPOSAL - first deletes old role in proposal if it exitsts,
  // then add user ID to proposal denpending on role send in invite email/useParams
  const handleAcceptProposal = async () => {
    deleteOldRole();
    try {
      if (role === 'client') {
        await dispatch(onEditPartialProposal({ _id: pid, clientId: user._id }));
      }
      if (role === 'businessCollaborator') {
        await dispatch(onAddBusinessCollaborator({ pid, user }));
      }
      if (role === 'businessApprover') {
        await dispatch(onAddBusinessApprover({ pid, user }));
      }
      if (role === 'clientCollaborator') {
        await dispatch(onAddClientCollaborator({ pid, user }));
      }
      if (role === 'clientApprover') {
        await dispatch(onAddClientApprover({ pid, user }));
      }

      // ADD PROPOSAL to USER's PROPOSAL ARRAY - if it doesnt already exist(userRole)
      if (!userRole.role) {
        await dispatch(onAddProposal(proposal));
      }

      navigate(`/sent-project/${pid}`);
    } catch (error) {
      console.error(error);
      dispatch(fetchError('Error accepting proposal: ' + error));
    }
  };

  // DELETE OLD ROLE... if user already has a arole in the proposal, delete it...
  // no applicable if user is business or  client admin... dont let change becuase then there would be no admin...
  const deleteOldRole = () => {
    if (userRole) {
      if (userRole.role === 'businessCollaborator') {
        dispatch(onDeleteBusinessCollaborator({ pid, user }));
      }
      if (userRole.role === 'businessApprover') {
        dispatch(onDeleteBusinessApprover({ pid, user }));
      }
      if (userRole.role === 'clientCollaborator') {
        dispatch(onDeleteClientCollaborator({ pid, user }));
      }
      if (userRole.role === 'clientApprover') {
        dispatch(onDeleteClientApprover({ pid, user }));
      }
    }
  };

  // SIGN UP... navigates to sign up if user i not logged in
  const handleSignUp = () => {
    navigate(`/signupUser/${role}/${pid}/${token}`);
  };

  // CONFIRM ACCEPT PPROPOSAL - asks user to confrim only if users already has a role in the proposal
  const handleOpenConfirm = () => {
    setConfirm(true);
  };

  return loading ? (
    <AppLoader message='Accepting Proposal' />
  ) : (
    <AppCard>
      {/* CONFIRM MODAL */}
      <AppConfirmDialog
        open={confirm}
        onDeny={() => setConfirm(false)}
        onConfirm={handleAcceptProposal}
        title={`You're already a ${userRole.displayRole} for this proposal. If you proceed to be assigned as a ${newRole}, you will no longer be assigned as a ${userRole.displayRole}. 
      Do you wish to Proceed?`}
        dialogTitle
      />
      <Box>
        <AppCard>
          <Box sx={{ display: 'flex', gap: '5px', alignItems: 'flex-end' }}>
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: Fonts.BOLD,
                mb: { xs: 3, lg: 4 },
              }}
            >
              {businessName}
            </Typography>
            <Typography
              sx={{
                fontSize: 16,

                mb: { xs: 3, lg: 4 },
              }}
            >
              {`${businessName} would like to assign you as a `}
            </Typography>
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: Fonts.BOLD,
                mb: { xs: 3, lg: 4 },
              }}
            >
              {newRole}
            </Typography>
            <Typography
              sx={{
                fontSize: 16,

                mb: { xs: 3, lg: 4 },
              }}
            >
              {`on the following proposal.`}
            </Typography>
          </Box>
          {userRole.role && (
            <Typography
              sx={{ color: 'red' }}
            >{`You're already are assigned to this proposal as a ${userRole.displayRole}...`}</Typography>
          )}
        </AppCard>
        {/* PROPOSAL CONTENT */}
        <AppCard>
          <Box>{ReactHtmlParser(proposalPreview)}</Box>
        </AppCard>

        {/* ACCEPT/SIGN UP BUTTON... does not show up id sign up if for client and client already exists in proposal
          OR if user already part of proposal as business or client admin */}
        {clientExists ? (
          <Typography sx={{ color: 'red' }}>
            {' '}
            {`A Client Administrator has already been assigned to this proposal.`}
          </Typography>
        ) : userRole.role === 'clientAdmin' ||
          userRole.role === 'businessAdmin' ? (
          <Typography sx={{ color: 'red' }}>
            {' '}
            {`You're a ${userRole.displayRole} for this proposal and cannot switch roles`}
          </Typography>
        ) : user ? (
          <Button
            variant='contained'
            onClick={userRole.role ? handleOpenConfirm : handleAcceptProposal}
          >
            Accept Proposal
          </Button>
        ) : (
          <Button variant='contained' onClick={handleSignUp}>
            Sign Up to Accept Proposal
          </Button>
        )}
      </Box>
      <AppInfoView />
    </AppCard>
  );
};
export default AcceptProposal;
