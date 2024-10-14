// import React, { useEffect, useState } from 'react';
// import Modal from '@mui/material/Modal';
// import ReactDiffViewer from 'react-diff-viewer';
// import striptags from 'striptags';
// import CloseIcon from '@mui/icons-material/Close';

// import {
//   Box,
//   InputLabel,
//   MenuItem,
//   FormControl,
//   Select,
//   Typography,
//   IconButton,
// } from '@mui/material';
// // MODAL STYLE
// const style = {
//   position: 'absolute',
//   top: '50vh',
//   left: '50%',

//   transform: 'translate(-50%, -50%)',
//   minWidth: '35vw',
//   width: '90vw',
//   minHeight: '60vh',
//   maxHeight: '90vh',
//   overflowY: 'auto',

//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   borderRadius: '20px',
// };

// export default function CompareDiffDisplay({
//   compareDiffs,
//   setCompareDiffs,
//   proposalVersions,
// }) {
//   //   CLOSE MODAL
//   const handleClose = () => {
//     setCompareDiffs(false);
//   };

  
//   // PROPOSAL VERSION TO BE COMPARED
//   const [versionOne, setVersionOne] = useState(proposalVersions?.length - 2);
//   const [versionTwo, setVersionTwo] = useState(proposalVersions?.length - 1);


//   // REPLACE PROPSAL paragrah and break tags with line break to make display visually accurate
//   const prop1X = proposalVersions[versionOne]?.content
//     .replace(/<p>/g, '\n')
//     .replace(/<\/p>/g, '')
//     .replace(/<br>/g, '\n') || '';

//   const prop2X = proposalVersions[versionTwo]?.content
//     .replace(/<p>/g, '\n')
//     .replace(/<\/p>/g, '')
//     .replace(/<br>/g, '\n') || '';

    

//   // REMOVE ADDITIONAL ELEMENT TAGS
//   const prop1 = striptags(prop1X);
//   const prop2 = striptags(prop2X);

//   const [splitView, setSplitView] = useState(true); // Default value for splitView

//   useEffect(() => {
//     const handleResize = () => {
//       const screenWidth = window.innerWidth;
//       const isSmallScreen = screenWidth < 768; // Adjust the threshold as needed
//       setSplitView(!isSmallScreen);
//     };

//     window.addEventListener('resize', handleResize);

//     // Cleanup function to remove event listener on component unmount
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   // NON DEFAULT STYLE FOR COMPARE DIFFS
//   const newStyles = {
//     diffContainer: {
//       minHeight: '50vh',
//     },
//     variables: {
//       dark: {
//         wordAddedBackground: '#53825f',
//         wordRemovedBackground: '#ed6d7c',
//       },
//     },
//     wordRemoved: {
//       textDecoration: 'line-through',
//       boxShadow: '-5px 5px 10px 5px rgba(0, 0, 0, 0.3);',
//     },
//     wordAdded: {
//       boxShadow: '-5px 5px 10px 5px rgba(0, 0, 0, 0.3);',
//     },
//   };

//   //  STLYE FOR CLOSE BUTTON
//   const closeButtonStyle = {
//     position: 'sticky',
//     height: '10px',
//     top: '0px',
//     left: '100%',
//     zIndex: '9999',
//   };

//   return (
//     <Modal
//       open={compareDiffs}
//       onClose={handleClose}
//       aria-labelledby='modal-modal-title'
//       aria-describedby='modal-modal-description'
//     >
//       <Box sx={style}>
//         <Box sx={closeButtonStyle}>
//           <IconButton onClick={handleClose}>
//             <CloseIcon
//               sx={{
//                 color: 'black',
//                 backgroundColor: 'white',
//                 borderRadius: '25px',
//               }}
//             />
//           </IconButton>
//         </Box>
//         <Box
//           sx={{
//             display: 'flex',
//             justifyContent: 'space-around',
//             width: '100%',
//           }}
//         >
//           <Box>
//             <FormControl required sx={{ m: 1 }}>
//               {/* OLD VERSION DROPDOWN */}
//               <InputLabel id='demo-simple-select-required-label'>V1</InputLabel>
//               <Select
//                 labelId='demo-simple-select-required-label'
//                 id='demo-simple-select-required'
//                 value={versionOne}
//                 label='Version'
//                 onChange={(e) => setVersionOne(Number(e.target.value))}
//               >
//                 {proposalVersions.map((_, index) => (
//                   <MenuItem key={index} value={index}>
//                     <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>
//                       {index + 1 === proposalVersions.length
//                         ? 'Current Version'
//                         : `Version ${index + 1}`}
//                     </Typography>
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
//               <Typography>updated by: </Typography>
//               <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>
//                 {proposalVersions[versionOne]?.creator?.userName}{' '}
//               </Typography>
//             </Box>
//           </Box>
//           {/* VERSION TWO DROPDOWN */}
//           <Box>
//             <FormControl required sx={{ m: 1 }}>
//               <InputLabel id='demo-simple-select-required-label'>V2</InputLabel>
//               <Select
//                 labelId='demo-simple-select-required-label'
//                 id='demo-simple-select-required'
//                 value={versionTwo}
//                 label='Version'
//                 onChange={(e) => setVersionTwo(Number(e.target.value))}
//               >
//                 {proposalVersions.map((_, index) => (
//                   <MenuItem
//                     key={index}
//                     value={index}
//                     sx={{ fontSize: 20, fontWeight: 'bold' }}
//                   >
//                     <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>
//                       {index + 1 === proposalVersions.length
//                         ? 'Current Version'
//                         : `Version ${index + 1}`}
//                     </Typography>
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
//               <Typography>updated by: </Typography>
//               <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>
//                 {proposalVersions[versionTwo]?.creator.userName}{' '}
//               </Typography>
//             </Box>
//           </Box>
//         </Box>

//         <ReactDiffViewer
//           oldValue={prop1}
//           newValue={prop2}
//           splitView={splitView}
//           disableWordDiff={false}
//           useDarkTheme={true}
//           styles={newStyles}
//           // leftTitle={`Version ${versionOne + 1}`}
//         />
//       </Box>
//     </Modal>
//   );
// }


import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import ReactDiffViewer from 'react-diff-viewer';
import striptags from 'striptags';
import CloseIcon from '@mui/icons-material/Close';

import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Typography,
  IconButton,
} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50vh',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '35vw',
  width: '90vw',
  minHeight: '60vh',
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

export default function CompareDiffDisplay({
  compareDiffs,
  setCompareDiffs,
  proposalVersions,
}) {
  const handleClose = () => {
    setCompareDiffs(false);
  };

  const [versionOne, setVersionOne] = useState(proposalVersions?.length - 2);
  const [versionTwo, setVersionTwo] = useState(proposalVersions?.length - 1);

  const prop1X = proposalVersions[versionOne]?.content
    ?.replace(/<p>/g, '\n')
    .replace(/<\/p>/g, '')
    .replace(/<br>/g, '\n') || '';

  const prop2X = proposalVersions[versionTwo]?.content
    ?.replace(/<p>/g, '\n')
    .replace(/<\/p>/g, '')
    .replace(/<br>/g, '\n') || '';

  const prop1 = striptags(prop1X);
  const prop2 = striptags(prop2X);

  const [splitView, setSplitView] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const isSmallScreen = screenWidth < 768;
      setSplitView(!isSmallScreen);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const newStyles = {
    diffContainer: {
      minHeight: '50vh',
    },
    variables: {
      dark: {
        wordAddedBackground: '#53825f',
        wordRemovedBackground: '#ed6d7c',
      },
    },
    wordRemoved: {
      textDecoration: 'line-through',
      boxShadow: '-5px 5px 10px 5px rgba(0, 0, 0, 0.3);',
    },
    wordAdded: {
      boxShadow: '-5px 5px 10px 5px rgba(0, 0, 0, 0.3);',
    },
  };

  const closeButtonStyle = {
    position: 'sticky',
    height: '10px',
    top: '0px',
    left: '100%',
    zIndex: '9999',
  };

  return (
    <Modal
      open={compareDiffs}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Box sx={closeButtonStyle}>
          <IconButton onClick={handleClose}>
            <CloseIcon
              sx={{
                color: 'black',
                backgroundColor: 'white',
                borderRadius: '25px',
              }}
            />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '100%',
          }}
        >
          <Box>
            <FormControl required sx={{ m: 1 }}>
              <InputLabel id='demo-simple-select-required-label'>V1</InputLabel>
              <Select
                labelId='demo-simple-select-required-label'
                id='demo-simple-select-required'
                value={versionOne}
                label='Version'
                onChange={(e) => setVersionOne(Number(e.target.value))}
              >
                {proposalVersions.map((_, index) => (
                  <MenuItem key={index} value={index}>
                    <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>
                      {index + 1 === proposalVersions.length
                        ? 'Current Version'
                        : `Version ${index + 1}`}
                    </Typography>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Typography>updated by: </Typography>
              <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>
                {proposalVersions[versionOne]?.creator?.userName}{' '}
              </Typography>
            </Box>
          </Box>
          <Box>
            <FormControl required sx={{ m: 1 }}>
              <InputLabel id='demo-simple-select-required-label'>V2</InputLabel>
              <Select
                labelId='demo-simple-select-required-label'
                id='demo-simple-select-required'
                value={versionTwo}
                label='Version'
                onChange={(e) => setVersionTwo(Number(e.target.value))}
              >
                {proposalVersions.map((_, index) => (
                  <MenuItem
                    key={index}
                    value={index}
                    sx={{ fontSize: 20, fontWeight: 'bold' }}
                  >
                    <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>
                      {index + 1 === proposalVersions.length
                        ? 'Current Version'
                        : `Version ${index + 1}`}
                    </Typography>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Typography>updated by: </Typography>
              <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>
                {proposalVersions[versionTwo]?.creator?.userName}{' '}
              </Typography>
            </Box>
          </Box>
        </Box>

        <ReactDiffViewer
          oldValue={prop1}
          newValue={prop2}
          splitView={splitView}
          disableWordDiff={false}
          useDarkTheme={true}
          styles={newStyles}
        />
      </Box>
    </Modal>
  );
}
