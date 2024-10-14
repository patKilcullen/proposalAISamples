import React, { useEffect, useState, useRef } from 'react';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';

import { useAuthUser } from '@crema/hooks/AuthHooks';

import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Canvas from './CanvasSignature';
import TextSignature from './TextSignature';
import UploadSignature from './UploadSignature';
import ContactInfo from './ContactInfo';
import Stakeholders from './Stakeholders';

import ReactHtmlParser from 'react-html-parser';
import OTPTimer from 'modules/Components/OTPTimerModal';
import { fetchError, oneTimePassword } from '../../../toolkit/actions';

import ExitButton from 'modules/Components/ExitButton';
import AppLoader from '@crema/components/AppLoader';
import AppCard from '@crema/components/AppCard';
const style = {
  position: 'absolute',
  top: '50vh',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '95vw',

  height: { xs: '100vh', sm: '100vh', lg: '95vh' },

  bgcolor: 'background.paper',

  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '20px',
};

export default function Signature({
  sign,
  setSign,
  handleSumbitProposal,

  content,
  handleAddClientSignature,
  handleAddBusinessSignature,
  resetSignature,
  openTimer,
  setOpenTimer,
  handleSendClientSignature,
  proposal,
  role,
}) {
  const { user } = useAuthUser();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { loading_otp, message } = useSelector(({ common }) => common);
  // SEND ONE TIME PASSWORD/OPEN TIMER
  const sendOtp = async () => {
    dispatch(oneTimePassword())
      .then((res) => {
        if (res.data.success) {
          setOpenTimer(true);
        }
      })
      .catch((error) => {
    
        dispatch(fetchError('Error sending OTP: ' + error));
      });
  };

  // EDITOR CONTENT - the content of the proposal
  const [editorContent, setEditorContent] = useState('');
  useEffect(() => {
    setEditorContent(content);
  }, [content]);

  //   // FORM SECTION: determines and changes the current section (signature, stakeholders) of the from
  const [activeSection, setActiveSection] = useState('sign');
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  //   // FORM SECTION: determines and changes the signture type form
  const [signatureType, setSignatureType] = useState('draw');
  const handleSignatureChange = (section) => {
    setSignatureType(section);
  };

  // OPEN MODAL
  useEffect(() => {
    if (sign) {
      setOpen(true);
    }
  }, [sign]);

  //   CLOSE MODAL
  const handleClose = () => {
    resetSignature();
    setOpen(false);
    setSign(false);
    resetSignature();
  };

  const date = new Date(Date.now());

  const fullDate = `${date.getMonth() + 1}/${date.getDate()}/${
    date.getFullYear() % 100
  }`;

  const contact = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'flex-start',
      }}
    >
      <ContactInfo title={'Name'} info={user.userName} icon={<PersonIcon />} />
      <ContactInfo title={'Email'} info={user.email} icon={<EmailIcon />} />
      <ContactInfo
        title={'Date'}
        info={fullDate}
        icon={<CalendarMonthIcon />}
      />
    </Box>
  );

  // SCROLL TO SIGNATURE Set the scrollTop of the content container to its scrollHeight
  const contentContainerRef = useRef(null);
  const scrollToSignature = () => {
    if (contentContainerRef.current) {
      contentContainerRef.current.scrollTop =
        contentContainerRef.current.scrollHeight;
    }
  };

  // ONE TIME PASSWORD TIME LIMIT
  const [timeLeft, setTimeLeft] = useState(900000);

  // ON COMPLETE ONE TIME PASSWORD: if admin/business, complete proposal, if client, send Clioent Signature to business
  const onComplete = () => {
    if (role === 'businessAdmin' || role === 'businessApprover') {
      handleSumbitProposal();
    }
    if (role === 'clientAdmin' || role === 'clientApprover') {
      handleSendClientSignature();
    }
  };
  const buttonText = 'Complete Signature';

  return (
    <>
      {loading_otp ? (
        <AppLoader message={message} />
      ) : (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <ExitButton onClose={handleClose} />
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'column', lg: 'row' },
                overflow: 'scroll',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}
            >
              {/* PROPOSAL CONTENT */}
              <AppCard
                ref={contentContainerRef}
                sx={{
                  flex: 3,
                  height: '85vh',
                  overflow: 'scroll',
                  padding: '5px',
                  border: '4px solid grey',
                  //  width: "60vw"
                }}
              >
                <Box
                  sx={{
                    backgroundColor: 'white',
                    padding: '10px',
                    minWidth: '70vw',
                    maxWidth: '100vw',
                  }}
                >
                  {ReactHtmlParser(editorContent)}
                </Box>
              </AppCard>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: { xs: '100%', sm: '100%', lg: '200%' },
                  flex: '2',
                  overflow: 'scroll',
                  bgcolor: 'white',
                  height: '85vh',
                }}
              >
                <Typography
                  id='modal-modal-title'
                  variant='h1'
                  component='h2'
                  fontWeight='bold'
                  sx={{ marginBottom: '20px' }}
                >
                  Sign Proposal
                </Typography>

                <ToggleButtonGroup
                  color='primary'
                  value={activeSection}
                  size='sm'
                  exclusive
                  onChange={(e) => handleSectionChange(e.target.value)}
                  sx={{
                    height: '20px',
                    marginBottom: '20px',
                    marginTop: '-10px',
                  }}
                >
                  <ToggleButton value='sign'>Signature</ToggleButton>
                  <ToggleButton value='stakeholders'>Stakeholders</ToggleButton>
                </ToggleButtonGroup>

                {activeSection === 'sign' ? (
                  <>
                    <ToggleButtonGroup
                      color='primary'
                      value={signatureType}
                      exclusive
                      onChange={(e) => handleSignatureChange(e.target.value)}
                    >
                      <ToggleButton value='draw'>Draw</ToggleButton>
                      <ToggleButton value='type'>Type</ToggleButton>
                      <ToggleButton value='upload'>Upload</ToggleButton>
                    </ToggleButtonGroup>

                    {signatureType === 'draw' ? (
                      <Canvas
                        contact={contact}
                        handleAddClientSignature={handleAddClientSignature}
                        handleAddBusinessSignature={handleAddBusinessSignature}
                        handleClose={handleClose}
                        scrollToSignature={scrollToSignature}
                        setOpenTimer={setOpenTimer}
                        sendOtp={sendOtp}
                        role={role}
                      />
                    ) : signatureType === 'type' ? (
                      <TextSignature
                        contact={contact}
                        handleAddClientSignature={handleAddClientSignature}
                        handleAddBusinessSignature={handleAddBusinessSignature}
                        scrollToSignature={scrollToSignature}
                        sendOtp={sendOtp}
                        role={role}
                      />
                    ) : (
                      <UploadSignature
                        contact={contact}
                        handleAddClientSignature={handleAddClientSignature}
                        handleAddBusinessSignature={handleAddBusinessSignature}
                        scrollToSignature={scrollToSignature}
                        sendOtp={sendOtp}
                        role={role}
                      />
                    )}
                  </>
                ) : activeSection === 'stakeholders' ? (
                  <Stakeholders />
                ) : null}
              </Box>
            </Box>

            <OTPTimer
              openTimer={openTimer}
              timeLeft={timeLeft}
              setTimeLeft={setTimeLeft}
              setOpenTimer={setOpenTimer}
              onComplete={onComplete}
              buttonText={buttonText}
              preview={'Preview Signature'}
              content={ReactHtmlParser(editorContent)}
              resetSignature={resetSignature}
               sendOtp={sendOtp}
            />
          </Box>
        </Modal>
      )}
    </>
  );
}
