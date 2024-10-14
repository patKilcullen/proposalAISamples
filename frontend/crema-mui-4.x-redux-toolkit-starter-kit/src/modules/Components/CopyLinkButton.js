



import React, { useEffect, useRef, useState } from 'react';
import { Button, Box } from '@mui/material';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
const CopyLinkButton = ({ text, disabled }) => {

 const { showMessage } = useInfoViewActionsContext();
const [textToCopy, setTextToCopy] = useState("")

useEffect(()=>{

setTextToCopy(text)

},[text])


  return (
    <Box>
      <Button  variant='contained' onClick={() => {navigator.clipboard.writeText(textToCopy)}}>
       <InsertLinkIcon /> Copy Link 
      </Button>
    </Box>
  );
};

export default CopyLinkButton;
