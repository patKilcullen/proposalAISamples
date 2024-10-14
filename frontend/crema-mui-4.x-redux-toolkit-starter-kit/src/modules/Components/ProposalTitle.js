import React, {useState} from "react";
import {useDispatch } from 'react-redux';

import EditIcon from '@mui/icons-material/Edit';
import AppTooltip from '@crema/components/AppTooltip';
import AppDialog from '@crema/components/AppDialog';
import { Box, Typography, Button, TextField } from '@mui/material';
import {onEditPartialProposal } from 'toolkit/actions';


const ProposalTitle = ({title, id, role}) => {
const dispatch = useDispatch()

    const [changeTitle, setChangeTitle]= useState(false)
    const [newTitle, setNewTitle]= useState(title)

    // OPEN CHANGE TITLE APPDIALOGUE
  const handleOpenChangeTitle = ()=>{
    setChangeTitle(true)
  }
// CHANGE TITLE IN INPUT/STATE
    const handleChangeTitle = (event) => {
    setNewTitle(event.target.value); // Update the state with the new input value
  };

//   DISPATCH UPDATE PROPOSAL WITH NEW TITLE
const handleUpdateTitle = ()=>{
   dispatch(onEditPartialProposal({_id: id, title: newTitle}))
  }

  return <>
          <Typography sx={{fontSize: "20px", fontWeight: "bold", display: "flex", justifyContent: "flex-start", alignItems: "center", gap:"5px"}}>
          {title}
          {role === 'businessAdmin' &&
          <AppTooltip title='Change Title'> <EditIcon 
          onClick={handleOpenChangeTitle}
          sx={{height: "20px"}}/></AppTooltip>}
          </Typography>

          <AppDialog open={changeTitle}
          onClose={()=>setChangeTitle(false)}
          sxStyle={{height: "250px"}}
          >
 
            <TextField
              name='title'
              // value={newTitle}
              variant='outlined'
              sx={{
                width: '100%',
                my: 2,
              }}
              placeholder='Title'
               value={newTitle}
              onChange={handleChangeTitle}
            />
          
            <Box sx={{display: "flex", justifyContent: "flex-end"}}>
            <Button variant='contained' onClick={handleUpdateTitle}>Update Title</Button>
            </Box>
          </AppDialog>
  </> 
  
};

export default ProposalTitle;
