import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, TextField, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import AppLoader from '@crema/components/AppLoader';
import { onUpdateParagraph } from 'toolkit/actions/Proposals';
import { clearUpdatedText } from 'toolkit/reducers/Proposals';
import AppCard from '@crema/components/AppCard';
import Editor from './Editor';
import ReactHtmlParser from 'react-html-parser';

// Modal style configuration
const style = {
  position: 'absolute',
  top: '50vh',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '35vw',
  maxHeight: '90vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '20px',
  zIndex: '999999',
};

// Style for blur effect when loading
const blurStyle = {
  filter: 'blur(2px)',
  pointerEvents: 'none',
};

export default function UpdateText({
  showUpdateText,
  setShowUpdateText,
  handleReplaceText,
  setSelection,
  textToReplace,
  setTextToReplace,
  displayText,
  // Uncomment for right-click version only
  setShowUpdateButton,
}) {
  const dispatch = useDispatch();
  const { updatedText, loading } = useSelector(({ proposals }) => proposals);
  const [conditions, setConditions] = useState('');
  const [updatedTextContent, setUpdatedTextContent] = useState('');

  // Close the modal and reset states
  const handleClose = () => {
    setShowUpdateText(false);
    setSelection(false);
    setConditions('');
    setTextToReplace('');
    setUpdatedTextContent('');
    // Uncomment for right-click version only
    setShowUpdateButton(false);
  };

  // Update the editor content with the updated text from state
  useEffect(() => {
    setUpdatedTextContent(updatedText);
  }, [updatedText]);

  const handleEditorChange = (value) => {
    setUpdatedTextContent(value);
  };

  // Submit updated text when the user clicks the update button
  const handleSubmitUpdateText = () => {
    dispatch(onUpdateParagraph({ paragraph: textToReplace, conditions }));
  };

  // Clear updated text from state when the component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearUpdatedText());
    };
  }, [dispatch]);

  const loaderRef = useRef(null); // Reference for the AppLoader

  // Focus on AppLoader when loading is true
  useEffect(() => {
    if (loading && loaderRef.current) {
      loaderRef.current.focus();
    }
  }, [loading]);

  return (
    <>
      <Modal
        open={showUpdateText}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={loading ? { ...style, ...blurStyle } : style}>
          <AppCard
            title='Edit with AI'
            sxStyle={{ overflowY: 'scroll', alignItems: 'center' }}
          >
            <Typography component='p' sx={{ fontSize: 16, fontWeight: 'bold' }}>
              Current Text:
            </Typography>
            <Typography>{ReactHtmlParser(displayText)}</Typography>

            <Typography
              component='p'
              sx={{ fontSize: 16, fontWeight: 'bold', marginTop: '10px' }}
            >
              Condition:
            </Typography>
            <TextField
              name='conditions'
              variant='outlined'
              sx={{ width: '100%', my: 2 }}
              placeholder='Explain how you want the selected text to be altered'
              value={conditions}
              onChange={(e) => setConditions(e.target.value)}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '10px',
              }}
            >
              <Button variant='contained' onClick={handleSubmitUpdateText}>
                Get Response
              </Button>
            </Box>
            {/* Display the AI response and provide options to edit or replace */}
            {updatedTextContent ? (
              <Box>
                <Box component='p' sx={{ fontSize: 16 }}>
                  Response
                </Box>
                <Editor
                  content={updatedTextContent}
                  onChange={handleEditorChange}
                  textReplace={true}
                />
                {/* Options to clear or replace text */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '5px',
                  }}
                >
                  <Button
                    onClick={() => dispatch(clearUpdatedText())}
                    variant='contained'
                  >
                    Clear
                  </Button>
                  <Button
                    onClick={() => {
                      handleReplaceText(updatedTextContent);
                      handleClose();
                    }}
                    variant='contained'
                  >
                    Replace
                  </Button>
                </Box>
              </Box>
            ) : null}
          </AppCard>
        </Box>
      </Modal>
      {/* Loader displayed when content is being generated */}
      {loading && (
        <Box sx={{ zIndex: 99999999999 }}>
          <AppLoader
            sx={{ zIndex: 9999 }}
            message={'ProposalAI is typing and rewriting...'}
          />
        </Box>
      )}
    </>
  );
}
