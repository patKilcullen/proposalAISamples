import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppInfoView from '@crema/components/AppInfoView';


import { useAuthUser } from '@crema/hooks/AuthHooks';

import {
  onGetBusinessUsers,
  onRemoveBusinessUser,
} from '../../toolkit/actions';

import AppCard from '@crema/components/AppCard';


import TeamMember from 'modules/Components/TeamMember';
import AppConfirmDialog from '@crema/components/AppConfirmDialog';
import { Typography } from '@mui/material';


const AllTeamMembers = () => {
  const { user } = useAuthUser();
  const dispatch = useDispatch();
  const users = useSelector(({ business }) => business.usersList);


// GET BUSINESS USERS ON MOUNT
 useEffect(() => {
     dispatch(onGetBusinessUsers(user?.businessId?._id));
 }, []);


// BUSINESS USERS: set from users in state
  const [businessUsers, setBusinessUsers] = useState([]);
  useEffect(() => {
    setBusinessUsers(users);
  }, [users]);



//  REMOVE MEMBER OF BUSINESS
const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
const [deleteUser, setDeleteUser] = useState({})
  const handleRemoveMember = (user) => {
    setDeleteUser(user)
    setOpenConfirmDelete(true)
  };

   const confirmRemoveMember = () => {
     dispatch(onRemoveBusinessUser(deleteUser._id));
     setOpenConfirmDelete(false);
   };

   const denyRemoveMember = ()=>{
      setDeleteUser("");
      setOpenConfirmDelete(false);
   }
  return (
    <AppCard>
      {businessUsers.length
        ? businessUsers.map((user, index ) => (
            <TeamMember key={index} user={user} handleRemoveMember={handleRemoveMember} />
          ))
        : <Typography>No team members to show.</Typography>}
      <AppInfoView />
      <AppConfirmDialog
        open={openConfirmDelete}
        onDeny={denyRemoveMember}
        onConfirm={confirmRemoveMember}
        title={`Are you sure you want to delete ${deleteUser.userName}?`}
        dialogTitle
      />
    </AppCard>
  );
};

export default AllTeamMembers;
