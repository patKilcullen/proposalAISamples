import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import { Box, Typography, Button } from '@mui/material';
import PropTypes from 'prop-types';
import AppDialog from '@crema/components/AppDialog';
import AppGridContainer from '@crema/components/AppGridContainer';
import Grid from '@mui/material/Grid';
import OtherDetails from './OtherDetails';
import PersonalDetails from './PersonalDetails';
import { useAuthUser } from '@crema/hooks/AuthHooks';
import AppConfirmDialog from '@crema/components/AppConfirmDialog';
import ReassignUserRole from 'modules/Components/ReassignUserRole';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import {
  onDeleteBusinessCollaborator,
  onDeleteBusinessApprover,
  onDeleteClientCollaborator,
  onDeleteClientApprover,
  getSingleProposal,
} from 'toolkit/actions';

const ContactDetail = (props) => {
  const {
    isShowDetail,
    selectedContact,
    onShowDetail,
    role,
    isBusiness,
    business,
    userCanEdit,
    pid,
    businessType,
  } = props;
  const dispatch = useDispatch();
  const { fetchError } = useInfoViewActionsContext();
  const [contact, setContact] = useState(selectedContact);
  const [openRemoveUser, setOpenRemoveUser] = useState(false);
  const [openReassingUser, setReassignUSer] = useState(false);

  // SET CONTACT
  useEffect(() => {
    setContact(selectedContact);
  }, [selectedContact]);

  // REASSIGN
  const onHandleReassignUser = () => {
    setReassignUSer(true);
  };
  const onCloseReassignUser = () => {
    setReassignUSer(false);
  };

  // REMOVE USEr
  const handleRemoveUser = () => {
    setOpenRemoveUser(true);
  };
  const handleCloseRemoveUser = () => {
    setOpenRemoveUser(false);
  };

  const removeUser = () => {
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

        dispatch(getSingleProposal(pid));
      } catch (error) {
        dispatch(fetchError('Error reassigning proposal: ' + error));
      }
    }
  };

  return (
    <AppDialog
      sxStyle={{
        '& .MuiPaper-root:hover': {
          '& .btn-action-view': {
            opacity: 1,
            visibility: 'visible',
          },
        },
      }}
      onClose={() => onShowDetail(false)}
      open={isShowDetail}
    >
      {contact ? (
        <div>
          <Box
            sx={{
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
              ml: -6,
              mr: -6,
              pl: 5,
              pr: 5,
              pb: 4,
            }}
          >
            <Box
              sx={{
                mb: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {/* PICTURE/AVATAR */}
              {/* if admin and has logo(for business) display that, othewise if user has profile pic,
            display that, otherwith get backgroun color from name */}
              {contact.logo ? (
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    mb: 2.5,
                  }}
                  src={`${process.env.REACT_APP_SERVER_URL}${contact.logo}`}
                />
              ) : contact.profileUrl ? (
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    mb: 2.5,
                  }}
                  src={`${process.env.REACT_APP_SERVER_URL}${contact.profileUrl}`}
                />
              ) : (
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    mb: 2.5,
                    backgroundColor: `#${Math.floor(
                      Math.random() * 16777215,
                    ).toString(16)}`,
                  }}
                >
                  {isBusiness
                    ? contact?.businessName?.substring(0, 3).toUpperCase()
                    : contact?.userName?.substring(0, 3).toUpperCase()}
                </Avatar>
              )}
              <Box component='h3'>
                {isBusiness ? contact?.businessName : contact?.userName}
              </Box>
              <Box component='h5'>{isBusiness && contact?.businessType}</Box>
              <Box component='h6'>
                {isBusiness && `Industry: ${contact?.industry}`}
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              mb: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            Role in proposal:
            <Typography sx={{ fontWeight: 'bold' }}>
              {role?.displayRole}
            </Typography>
          </Box>
          <Box
            sx={{
              pt: 5,
            }}
          >
            <AppGridContainer>
              <Grid item xs={12} md={6}>
                <PersonalDetails contact={contact} />
              </Grid>

              <Grid item xs={12} md={6}>
                <OtherDetails contact={contact} business={business} />
              </Grid>
            </AppGridContainer>
          </Box>
        </div>
      ) : (
        <div />
      )}
      {userCanEdit && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '-20px',
          }}
        >
          <Button onClick={handleRemoveUser}>Remove From Proposal</Button>
          <AppConfirmDialog
            open={openRemoveUser}
            onDeny={handleCloseRemoveUser}
            onConfirm={removeUser}
            title={`Are you sure you want to remove ${contact.userName} from this proposal?`}
          />
          <Button onClick={onHandleReassignUser}>Reassign User Role</Button>
          <ReassignUserRole
            open={openReassingUser}
            handleClose={onCloseReassignUser}
            contact={selectedContact}
            role={role}
            businessType={businessType}
            pid={pid}
          />
        </Box>
      )}
    </AppDialog>
  );
};

export default ContactDetail;

ContactDetail.propTypes = {
  isShowDetail: PropTypes.bool.isRequired,
  onShowDetail: PropTypes.func.isRequired,
  selectedContact: PropTypes.object,
  onSelectContactsForDelete: PropTypes.func,
  onOpenEditContact: PropTypes.func,
};
