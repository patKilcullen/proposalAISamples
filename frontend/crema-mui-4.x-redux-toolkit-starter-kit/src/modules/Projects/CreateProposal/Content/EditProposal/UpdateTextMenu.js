import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import UpdateText from 'modules/Components/UpdateText';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

import { fetchError } from 'toolkit/actions';

const UpdateTextMenu = ({
  handleEditorHighLigthChange,
  handleReplaceText,
  setTextToReplace,
  textToReplace,
}) => {
  const [selectionHtml, setSelectionHtml] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [position, setPosition] = useState('');
  const [showUpdateText, setShowUpdateText] = useState(false);
  const [showUpdateButton, setShowUpdateButton] = useState(false);

  // OPEN UPDATE TEXT MODAL
  const handleUpdateAI = () => {
    setShowUpdateText(true);
  };

  // when text higlighted, get info and show button to open update txt modal
  useEffect(() => {
    function showButton(event) {
      event.preventDefault();
      setShowUpdateButton(true);
    }
    // ADD TEXT to give to updateText modal
    function addText() {
      if (!showUpdateText) {
        const activeSelection = window.getSelection();
        if (activeSelection && activeSelection.rangeCount > 0) {
          const range = activeSelection.getRangeAt(0);
          const clonedContent = range.cloneContents();
          const tempDiv = document.createElement('div');
          tempDiv.appendChild(clonedContent);
          const htmlContent = tempDiv.innerHTML;

          if (htmlContent) {
            setDisplayText(tempDiv.innerHTML);
            setTextToReplace(htmlContent);
            setSelectionHtml(htmlContent);

            const rect = range.getBoundingClientRect();
            setPosition({
              x: rect.left - 300,
              y: rect.top + window.scrollY - 110,
            });
          }
        }
      }
    }
    // listen for higlithing text
    document.addEventListener('contextmenu', showButton);
    document.addEventListener('selectionchange', addText);

    return () => {
      document.removeEventListener('contextmenu', showButton);
      document.removeEventListener('selectionchange', addText);
    };
  }, [showUpdateText]);

  return (
    <div>
      <UpdateText
        showUpdateText={showUpdateText}
        setShowUpdateText={setShowUpdateText}
        handleEditorHighLigthChange={handleEditorHighLigthChange}
        handleReplaceText={handleReplaceText}
        setSelection={setSelectionHtml}
        textToReplace={textToReplace}
        setTextToReplace={setTextToReplace}
        displayText={displayText}
        setShowUpdateButton={setShowUpdateButton}
      />
      {/* EDIT WITH AI BUTTON */}
      {selectionHtml && position && !showUpdateText && showUpdateButton ? (
        <Button
          sx={{
            position: 'absolute',
            top: position.y + 'px',
            left: position.x + 'px',
            zIndex: 9999,
            display: 'flex',
            gap: '5px',
          }}
          color='primary'
          variant='contained'
          onClick={handleUpdateAI}
        >
          Edit w/AI
          <AutoFixHighIcon sx={{ height: '20px' }} />
        </Button>
      ) : null}
    </div>
  );
};

export default UpdateTextMenu;
