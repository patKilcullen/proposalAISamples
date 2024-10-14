// // // WITH RIGHT CLICK
// import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { Button } from '@mui/material';
// import UpdateText from 'modules/Components/UpdateText';
// import AppInfoView from '@crema/components/AppInfoView';

// import { fetchError } from 'toolkit/actions';

// const UpdateTextMenu = ({
//   handleReplaceText,
//   setTextToReplace,
//   textToReplace,
//   editorContent,
// }) => {
//   const dispatch = useDispatch();
//   const [selection, setSelection] = useState('');
//   const [position, setPosition] = useState('');
//   const [showUpdateText, setShowUpdateText] = useState(false);
//   const [showUpdateButton, setShowUpdateButton] = useState(false);

//   // OPEN UPDATE TEXT MODAL/POPUP: if more that one paragraph selected, fetch error
//   const handleUpdateAI = () => {
//     if (!editorContent.includes(textToReplace)) {
//       dispatch(fetchError('Update one paragraph at a time...'));
//     } else {
//       setShowUpdateText(true);
//     }
//   };

//   // SELECT TEXT EVENT LISTENERS: when user highlights text, run addText function
//   // When right-click on  selecred text, show "Edit w/AI" button
//   useEffect(() => {
//     function showButton(event) {
//       event.preventDefault();
//       setShowUpdateButton(true);
//     }

//     // ADD SELECTED TEST, gets text selected by user, sets it in state, and gets position of selection to set position
//     // dont run if showUpdateText is false/modal is open (allows clicks in modal)
//     function addText() {
//       setShowUpdateButton(false);
//       if (!showUpdateText) {
//         const activeSelection = document.getSelection();
//         const text = activeSelection?.toString();

//         if (text) {
//           setTextToReplace(text);
//           setSelection(text);

//           if (activeSelection.rangeCount > 0) {
//             const rect = activeSelection.getRangeAt(0).getBoundingClientRect();

//             setPosition({
//               x: rect.left - 300,
//               y: rect.top + window.scrollY - 110,
//             });
//           }
//         }
//       }
//     }

//     document.addEventListener('contextmenu', showButton);
//     document.addEventListener('selectionchange', addText);

//     return () => {
//       document.removeEventListener('contextmenu', showButton);
//       document.removeEventListener('selectionchange', addText);
//     };
//   }, [showUpdateText]);

//   return (
//     <div>
//       <UpdateText
//         showUpdateText={showUpdateText}
//         setShowUpdateText={setShowUpdateText}
//         handleReplaceText={handleReplaceText}
//         setSelection={setSelection}
//         textToReplace={textToReplace}
//         setTextToReplace={setTextToReplace}
//         // for right click version only
//         setShowUpdateButton={setShowUpdateButton}
//       />

//       {/* text selected and modal/popup not open, display button */}
//       {selection && position && !showUpdateText && showUpdateButton ? (
//         <Button
//           sx={{
//             position: 'absolute',
//             top: position.y + 'px',
//             left: position.x + 'px',
//             zIndex: 9999,
//           }}
//           color='primary'
//           variant='contained'
//           onClick={handleUpdateAI}
//         >
//           Edit w/AI
//         </Button>
//       ) : null}
//       {/* FETCH CONTEXT */}
//       <AppInfoView />
//       {/* <AppInfoView type={'context'} /> */}
//     </div>
//   );
// };

// export default UpdateTextMenu;

// DONT DELTE BELOR

// // // WITHOUT RIGHT CLICK : DOESN"T INCLUDE APPINFOVIEW ERROR
// import React, { useEffect, useState } from 'react';
// import { Button } from '@mui/material';

// // import UpdateText from '../../../../../Components/UpdateText';
// import UpdateText from 'modules/Components/UpdateText';

// import AutoModeIcon from '@mui/icons-material/AutoMode';
// import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
// const UpdateTextMenu = ({
//   handleEditorHighLigthChange,
//   handleReplaceText,
//   setTextToReplace,
//   textToReplace,
// }) => {
//   const [selection, setSelection] = useState('');
//   const [position, setPosition] = useState('');
//   const [showUpdateText, setShowUpdateText] = useState(false);
//    const [showUpdateButton, setShowUpdateButton] = useState(false);
//   // // ADD TEXT: gets text selcted by user, sets it in state and gets position of selection to set position
//   // function addText() {
//   //   if (!showUpdateText) {
//   //     const activeSelection = document.getSelection();
//   //     const text = activeSelection?.toString();

//   //     setTextToReplace(text);
//   //     setSelection(text);

//   //     const rect = activeSelection.getRangeAt(0).getBoundingClientRect();

//   //     setPosition({
//   //       x: rect.left - 300,
//   //       y: rect.top + window.scrollY - 110,
//   //     });
//   //   }
//   // }

//      // ADD SELECTED TEST, gets text selected by user, sets it in state, and gets position of selection to set position
//     // dont run if showUpdateText is false/modal is open (allows clicks in modal)
//     function addText() {
//       // setShowUpdateButton(false);
//       if (!showUpdateText) {
//         const activeSelection = document.getSelection();
//         const text = activeSelection?.toString();

//         if (text) {
//           setTextToReplace(text);
//           setSelection(text);

//           if (activeSelection.rangeCount > 0) {
//             const rect = activeSelection.getRangeAt(0).getBoundingClientRect();

//             setPosition({
//               x: rect.left - 300,
//               y: rect.top + window.scrollY - 110,
//             });
//           }
//         }
//       }
//     }
//   // SELECT TEXT EVEN LISTNERS: when user higlights text, run addTextFunciton
//   // set listened when showUpdateTExt changes so when its false it addText body wont run and resent selected text
//   useEffect(() => {
//     document.addEventListener('selectionchange', addText);
//     return () => {
//       document.removeEventListener('selectionchange', addText);
//     };
//   }, [showUpdateText]);

//   // OPEN UPDATETEXT MODAL.POPUP
//   const handleUpdateAI = () => {
//     setShowUpdateText(true);
//   };

//   return (
//     <div>
//       {' '}
//       <UpdateText
//         showUpdateText={showUpdateText}
//         setShowUpdateText={setShowUpdateText}
//         handleEditorHighLigthChange={handleEditorHighLigthChange}
//         handleReplaceText={handleReplaceText}
//         setSelection={setSelection}
//         textToReplace={textToReplace}
//         setTextToReplace={setTextToReplace}
//       />
//       {/* text selcted and modal/popup not open, display button */}
//       {selection && position && !showUpdateText ? (
//         <Button
//           sx={{
//             position: 'absolute',
//             top: position.y + 'px',
//             left: position.x + 'px',
//             zIndex: 9999,
//             display: "flex",
//             gap: "5px"
//           }}
//           color='primary'
//           variant='contained'
//           onClick={handleUpdateAI}
//         >
//     Edit w/AI 
   
//       <AutoFixHighIcon sx={{height: "20px"}} />
//         </Button>
//       ) : null}
//     </div>
//   );
// };

// export default UpdateTextMenu;




// // // WITHOUT RIGHT CLICK : DOESN"T INCLUDE APPINFOVIEW ERROR
// import React, { useEffect, useState } from 'react';
// import { Button } from '@mui/material';
// import { useDispatch } from 'react-redux';
// // import UpdateText from '../../../../../Components/UpdateText';
// import UpdateText from 'modules/Components/UpdateText';

// import AutoModeIcon from '@mui/icons-material/AutoMode';
// import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

//  import { fetchError } from 'toolkit/actions';
// const UpdateTextMenu = ({
//   handleEditorHighLigthChange,
//   handleReplaceText,
//   setTextToReplace,
//   textToReplace,
//      editorContent,
// }) => {
//   const dispatch = useDispatch();
//   const [selection, setSelection] = useState('');
//   const [position, setPosition] = useState('');
//   const [showUpdateText, setShowUpdateText] = useState(false);
//    const [showUpdateButton, setShowUpdateButton] = useState(false);
//     // OPEN UPDATE TEXT MODAL/POPUP: if more that one paragraph selected, fetch error
//   const handleUpdateAI = () => {

//     // if (!editorContent.includes(textToReplace)) {
//     //   dispatch(fetchError('Update one paragraph at a time and exclude links and styled content.'));
//     // } else {
//     //   setShowUpdateText(true);
//     // }
// setShowUpdateText(true);
//   };

//   // SELECT TEXT EVENT LISTENERS: when user highlights text, run addText function
//   // When right-click on  selecred text, show "Edit w/AI" button
//   useEffect(() => {
//     function showButton(event) {
//       event.preventDefault();
//       setShowUpdateButton(true);
//     }

//     // ADD SELECTED TEST, gets text selected by user, sets it in state, and gets position of selection to set position
//     // dont run if showUpdateText is false/modal is open (allows clicks in modal)
//     function addText() {
//       // setShowUpdateButton(false);
//       if (!showUpdateText) {
//         const activeSelection = document.getSelection();
//         const text = activeSelection?.toString();
//         console.log("activeSelection: ", activeSelection)
//         console.log("text: ", text)

//         if (text) {
         
//           setTextToReplace(text);
//           setSelection(text);

//           if (activeSelection.rangeCount > 0) {
//             const rect = activeSelection.getRangeAt(0).getBoundingClientRect();

//             setPosition({
//               x: rect.left - 300,
//               y: rect.top + window.scrollY - 110,
//             });
//           }
//         }
//       }
//     }

//     document.addEventListener('contextmenu', showButton);
//     document.addEventListener('selectionchange', addText);

//     return () => {
//       document.removeEventListener('contextmenu', showButton);
//       document.removeEventListener('selectionchange', addText);
//     };
//   }, [showUpdateText]);


//   return (
//     <div>
//       {' '}
//       <UpdateText
//         showUpdateText={showUpdateText}
//         setShowUpdateText={setShowUpdateText}
//         handleEditorHighLigthChange={handleEditorHighLigthChange}
//         handleReplaceText={handleReplaceText}
//         setSelection={setSelection}
//         textToReplace={textToReplace}
//         setTextToReplace={setTextToReplace}
//       />
//       {/* text selcted and modal/popup not open, display button */}
//       {selection && position && !showUpdateText ? (
//         <Button
//           sx={{
//             position: 'absolute',
//             top: position.y + 'px',
//             left: position.x + 'px',
//             zIndex: 9999,
//             display: "flex",
//             gap: "5px"
//           }}
//           color='primary'
//           variant='contained'
//           onClick={handleUpdateAI}
//         >
//     Edit w/AI 
   
//       <AutoFixHighIcon sx={{height: "20px"}} />
//         </Button>
//       ) : null}
//     </div>
//   );
// };

// export default UpdateTextMenu;



// import React, { useEffect, useState } from 'react';
// import { Button } from '@mui/material';
// import { useDispatch } from 'react-redux';
// import UpdateText from 'modules/Components/UpdateText';
// import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

// import { fetchError } from 'toolkit/actions';

// const UpdateTextMenu = ({
//   handleEditorHighLigthChange,
//   handleReplaceText,
//   setTextToReplace,
//   textToReplace,
//   editorContent,
// }) => {
//   const dispatch = useDispatch();
//   const [selectionHtml, setSelectionHtml] = useState('');
//    const [displayText, setDisplayText] = useState('');
//   const [position, setPosition] = useState('');
//   const [showUpdateText, setShowUpdateText] = useState(false);
//   const [showUpdateButton, setShowUpdateButton] = useState(false);

//   const handleUpdateAI = () => {
//     setShowUpdateText(true);
//   };

//   useEffect(() => {
//     function addText() {
//       if (!showUpdateText) {
//         const activeSelection = window.getSelection();
//         if (activeSelection && activeSelection.rangeCount > 0) {
//           const range = activeSelection.getRangeAt(0);
//           const clonedContent = range.cloneContents();
//           const tempDiv = document.createElement('div');
//           tempDiv.appendChild(clonedContent);
//           const htmlContent = tempDiv.innerHTML;

//           if (htmlContent) {
//             setDisplayText(tempDiv.innerHTML)
//             setTextToReplace(htmlContent);
//             setSelectionHtml(htmlContent);

//             const rect = range.getBoundingClientRect();
//             setPosition({
//               x: rect.left - 300,
//               y: rect.top + window.scrollY - 110,
//             });
//           }
//         }
//       }
//     }

//     document.addEventListener('selectionchange', addText);

//     return () => {
//       document.removeEventListener('selectionchange', addText);
//     };
//   }, [showUpdateText]);

//   return (
//     <div>
//       <UpdateText
//         showUpdateText={showUpdateText}
//         setShowUpdateText={setShowUpdateText}
//         handleEditorHighLigthChange={handleEditorHighLigthChange}
//         handleReplaceText={handleReplaceText}
//         setSelection={setSelectionHtml}
//         textToReplace={textToReplace}
//         setTextToReplace={setTextToReplace}
//         displayText={displayText}
//         setShowUpdateButton={setShowUpdateButton}
//       />
//       {selectionHtml && position && !showUpdateText ? (
//         <Button
//           sx={{
//             position: 'absolute',
//             top: position.y + 'px',
//             left: position.x + 'px',
//             zIndex: 9999,
//             display: 'flex',
//             gap: '5px',
//           }}
//           color='primary'
//           variant='contained'
//           onClick={handleUpdateAI}
//         >
//           Edit w/AI
//           <AutoFixHighIcon sx={{ height: '20px' }} />
//         </Button>
//       ) : null}
//     </div>
//   );
// };

// export default UpdateTextMenu;



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
  editorContent,
  //   handleEditorHighLigthChange,
//   handleReplaceText,
//   setTextToReplace,
//   textToReplace,
}) => {
  const dispatch = useDispatch();
  const [selectionHtml, setSelectionHtml] = useState('');
   const [displayText, setDisplayText] = useState('');
  const [position, setPosition] = useState('');
  const [showUpdateText, setShowUpdateText] = useState(false);
  const [showUpdateButton, setShowUpdateButton] = useState(false);

  const handleUpdateAI = () => {
    setShowUpdateText(true);
  };

  useEffect(() => {

     function showButton(event) {
      event.preventDefault();
      setShowUpdateButton(true);
    }

    
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
            setDisplayText(tempDiv.innerHTML)
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
      {selectionHtml && position && !showUpdateText  && showUpdateButton ? (
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
