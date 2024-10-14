import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';



const terms = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa tempor nec feugiat nisl pretium fusce id velit ut. Morbi tristique senectus et netus et malesuada. Tristique risus nec feugiat in fermentum. Molestie nunc non blandit massa. Pharetra diam sit amet nisl suscipit adipiscing bibendum. In mollis nunc sed id semper risus in. Ipsum suspendisse ultrices gravida dictum fusce ut placerat orci. Facilisis magna etiam tempor orci eu lobortis elementum nibh tellus. Vivamus at augue eget arcu. Ipsum dolor sit amet consectetur adipiscing. Sit amet dictum sit amet justo donec enim. Quis blandit turpis cursus in hac habitasse platea dictumst quisque. Leo vel orci porta non pulvinar neque laoreet. Cursus sit amet dictum sit amet justo donec enim diam. Pulvinar pellentesque habitant morbi tristique senectus. Facilisi morbi tempus iaculis urna id. Scelerisque purus semper eget duis at tellus. In nulla posuere sollicitudin aliquam ultrices sagittis orci. Id volutpat lacus laoreet non curabitur gravida arcu ac tortor. Ut ornare lectus sit amet. Nulla porttitor massa id neque aliquam vestibulum morbi. Dictum fusce ut placerat orci nulla pellentesque dignissim enim. Fusce id velit ut tortor pretium viverra suspendisse. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis. Dui nunc mattis enim ut tellus elementum sagittis. Et malesuada fames ac turpis egestas integer eget aliquet. Vestibulum rhoncus est pellentesque elit ullamcorper. Magna etiam tempor orci eu lobortis elementum nibh. Sed risus ultricies tristique nulla aliquet. Faucibus vitae aliquet nec ullamcorper sit amet risus nullam. Nec feugiat nisl pretium fusce. Ornare aenean euismod elementum nisi. Ullamcorper a lacus vestibulum sed arcu non odio euismod lacinia. Fermentum iaculis eu non diam phasellus vestibulum lorem. Ullamcorper eget nulla facilisi etiam dignissim diam quis enim. Pretium quam vulputate dignissim suspendisse in est ante in. Ipsum dolor sit amet consectetur. Amet nisl suscipit adipiscing bibendum. Non pulvinar neque laoreet suspendisse. Curabitur vitae nunc sed velit dignissim. Arcu risus quis varius quam quisque id. In tellus integer feugiat scelerisque varius morbi enim nunc. Amet nisl suscipit adipiscing bibendum est ultricies integer quis auctor. Aliquam nulla facilisi cras fermentum odio eu feugiat pretium. Ante in nibh mauris cursus mattis molestie a iaculis. Non enim praesent elementum facilisis leo vel fringilla est. Quam id leo in vitae turpis massa sed. Sapien pellentesque habitant morbi tristique senectus et netus et malesuada. Vel orci porta non pulvinar neque laoreet suspendisse interdum consectetur. Amet justo donec enim diam. Viverra adipiscing at in tellus integer feugiat. Amet volutpat consequat mauris nunc congue nisi vitae suscipit. Lectus urna duis convallis convallis. Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis. Sem et tortor consequat id porta nibh venenatis cras. Tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum. Nunc eget lorem dolor sed viverra ipsum. Sed adipiscing diam donec adipiscing tristique. Iaculis nunc sed augue lacus. Id leo in vitae turpis massa sed elementum tempus. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper. Iaculis urna id volutpat lacus laoreet non. Justo laoreet sit amet cursus sit amet dictum. Id eu nisl nunc mi ipsum faucibus. Nullam non nisi est sit amet."

const style = {
  position: 'absolute',
  top: '50vh',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '75vw',
  maxHeight: '90vh', 
  overflowY: 'auto', 
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column', 
  alignItems: 'center',
};

const closeButtonStyle = {
  marginTop: '16px', 
};

export default function TermsAndConditions({
  previewTerms,
  setPreviewTerms,
}) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setPreviewTerms(false);
  };

  useEffect(() => {
    previewTerms ? handleOpen() : handleClose();
  }, [previewTerms]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography
            id='modal-modal-title'
            variant='h1'
            component='h2'
            fontWeight='bold'
          >
            Terms and Conditions
          </Typography>
          <div>
            {terms}
          </div>
          <Button style={closeButtonStyle} onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
