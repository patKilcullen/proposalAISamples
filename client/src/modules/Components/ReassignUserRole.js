import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthUser } from '@crema/hooks/AuthHooks';
import AppCard from '@crema/components/AppCard';
import MenuItem from '@mui/material/MenuItem';
import { Box, Button, Typography, TextField, Modal } from '@mui/material';
import AppComponentHeader from '@crema/components/AppComponentHeader';
import { onGetUserContacts } from '../../toolkit/actions';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import validator from 'email-validator';
import ExitButton from 'modules/Components/ExitButton';
import AppInfoView from '@crema/components/AppInfoView';
import ConfirmAdminReassignment from './ConfirmAdminReassignment';
import {
  onEditPartialProposal,
  onAddBusinessCollaborator,
  onAddBusinessApprover,
  onAddClientCollaborator,
  onAddClientApprover,
  onDeleteBusinessCollaborator,
  onDeleteBusinessApprover,
  onDeleteClientCollaborator,
  onDeleteClientApprover,
  getSingleProposal,
} from 'toolkit/actions';

// Modal style
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '35vw',
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '20px',
};

export default function ReassignUserRole({
  open,
  handleClose,
  link,
  contact,
  role,
  businessType,
  pid,
}) {
  const { user } = useAuthUser();
  const dispatch = useDispatch();
  const { fetchError } = useInfoViewActionsContext();
  const [newRole, setNewRole] = useState('');
  const [newAdminRole, setNewAdminRole] = useState('');
  const [adminWarning, setAdminWarning] = useState(false);

  // GET THE BUSINESS CONTACTS
  useEffect(() => {
    dispatch(onGetUserContacts(user._id));
  }, [dispatch, user._id]);

  const handleDenyAdmin = () => {
    setAdminWarning(false);
  };
  const handleConfirmAdmin = () => {
    reassignUser();
  };

  // HANDLE REASSIGN - first check if admin and open confim modal if so
  const handleReassignUser = () => {
    if (newRole === 'Administrator') {
      setAdminWarning(true);
    } else {
      reassignUser(newRole);
    }
  };

  // REASSIGN USER
  // delete old role then filter of bisiness or clinet then add user to appropriate array,
  const reassignUser = async () => {
    deleteOldRole();
    try {
      if (businessType === 'business') {
        if (newRole === 'Approver') {
          await dispatch(onAddBusinessApprover({ pid, user: contact }));
        }
        if (newRole === 'Collaborator') {
          await dispatch(onAddBusinessCollaborator({ pid, user: contact }));
        }
        if (newRole === 'Administrator') {
          await dispatch(
            onEditPartialProposal({ _id: pid, businessId: contact.businessId }),
          );
          if (newAdminRole === 'Approver') {
            await dispatch(onAddBusinessApprover({ pid, user: user }));
          }
          if (newAdminRole === 'Collaborator') {
            await dispatch(onAddBusinessCollaborator({ pid, user: user }));
          }
        }
      }
      if (businessType === 'client') {
        if (newRole === 'Approver') {
          await dispatch(onAddClientApprover({ pid, user: contact }));
        }
        if (newRole === 'Collaborator') {
          await dispatch(onAddClientCollaborator({ pid, user: contact }));
        }
        if (newRole === 'Administrator') {
          await dispatch(
            onEditPartialProposal({ _id: pid, clientId: contact._id }),
          );
          if (newAdminRole === 'Approver') {
            await dispatch(onAddClientApprover({ pid, user: user }));
          }
          if (newAdminRole === 'Collaborator') {
            await dispatch(onAddClientCollaborator({ pid, user: user }));
          }
        }
      }

      await dispatch(getSingleProposal(pid));
      handleClose();
    } catch (error) {
      console.error(error);
      dispatch(fetchError('Error reassigning proposal: ' + error));
    }
  };

  // DELETE OLD ROLE... if user already has a arole in the proposal, delete it...
  // no applicable if user is business or  client admin... because will be reassigned
  const deleteOldRole = () => {
    if (role.role) {
      try {
        if (role.role === 'businessCollaborator') {
          dispatch(onDeleteBusinessCollaborator({ pid, user: contact }));
        }
        if (role.role === 'businessApprover') {
          dispatch(onDeleteBusinessApprover({ pid, user: contact }));
        }
        if (role.role === 'clientCollaborator') {
          dispatch(onDeleteClientCollaborator({ pid, user: contact }));
        }
        if (role.role === 'clientApprover') {
          dispatch(onDeleteClientApprover({ pid, user: contact }));
        }
      } catch (error) {
        dispatch(fetchError('Error reassigning proposal: ' + error));
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <ExitButton onClose={handleClose} />
        <AppComponentHeader title={'Reassgin User Role'} />
        <AppCard sx={{ maxWidth: '700px' }}>
          <Box sx={{ borderRadius: '0px' }}>
            <Box sx={{ padding: '10px' }}>
              {/* ADD NEW MEMBER */}
              <Typography component='p' sx={{ fontSize: 16 }}>
                Contact Information:{' '}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: { xs: 'wrap', sm: 'nowrap' },
                  marginTop: '5px',
                }}
              >
                <TextField
                  id='outlined'
                  label='Name'
                  InputLabelProps={{ shrink: true }}
                  sx={{ width: '175px', mt: 1 }}
                  disabled={true}
                  value={contact.userName}
                />

                {/* MEMBER CONTACT EMAIL INPUT */}
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label='Contact Email'
                  sx={{ width: '175px' }}
                  disabled={true}
                  value={contact.email}
                />

                {/* MEMBER CONTACT CURRENT ROLE */}
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label='Current Role'
                  sx={{ width: '175px' }}
                  disabled={true}
                  value={role.displayRole}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  gap: '5px',
                }}
              >
                {/* ROLE DROPDOWN SELECT */}
                <Typography sx={{ fontSize: '16px' }}>New Role: </Typography>
                <TextField
                  required
                  value={newRole}
                  onChange={(e) => {
                    setNewRole(e.target.value);
                  }}
                  select
                  sx={{ width: '175px', mt: 1 }}
                >
                  {/* check for business ID... cant assing if user doesnt have a business */}
                  {contact.businessId && (
                    <MenuItem key={1} value='Administrator'>
                      Administrator
                    </MenuItem>
                  )}
                  {role.role !== 'businessCollaborator' &&
                    role.role !== 'clientCollaborator' && (
                      <MenuItem key={1} value='Collaborator'>
                        Collaborator
                      </MenuItem>
                    )}
                  {role.role !== 'businessApprover' &&
                    role.role !== 'clientApprover' && (
                      <MenuItem key={2} value='Approver'>
                        Approver
                      </MenuItem>
                    )}
                </TextField>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              marginTop: '16px',
              justifyContent: link ? 'space-around' : 'flex-end',
            }}
          >
            {/* SUBMIT BUTTON */}
            <Button onClick={() => handleReassignUser()} variant='contained'>
              Reassign
            </Button>
          </Box>
          {/* CONSFIRM ADMIN REASSIGNMENT */}
          <ConfirmAdminReassignment
            open={adminWarning}
            onConfirm={handleConfirmAdmin}
            onDeny={handleDenyAdmin}
            newAdminRole={newAdminRole}
            setNewAdminRole={setNewAdminRole}
          ></ConfirmAdminReassignment>
        </AppCard>
        <AppInfoView type='context' />
      </Box>
    </Modal>
  );
}
