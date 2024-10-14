// import React, { useState, useEffect } from 'react';
// import { Box, Button, Typography } from '@mui/material';
// import Signature from './Singnature';
// import ProposalSideMenu from '../ProposalSideMenu';
// import { Fonts } from '@crema/constants/AppEnums';
// import SingleUser from 'modules/Users/AllProposalUsers/SingleUser';
// import { getRoles } from 'utils/roleUtils';
// import AppCard from '@crema/components/AppCard';
// import { grey } from '@mui/material/colors';

// import { roleStatusDisplay } from 'utils/roleStatusDisplay';
// const SentProposalSideMenu = ({
//   proposal,
//   role,
//   selectedVersionNum,
//   proposalVersions,
//   handleSelectVersion,
//   status,
//   displayRole,
//   handleClientEdit,
//   handleSumbitProposal,
//   handleSendClientSignature,
//   proposalVersion,
//   handleAddClientSignature,
//   handleAddBusinessSignature,
//   resetSignature,
//   openTimer,
//   setOpenTimer,
//   roleType,
// }) => {
//   const [sign, setSign] = useState(false);
//   const [signatories, setSignatories] = useState({
//     client: null,
//     business: null,
//   });


//   useEffect(()=>{
  

//   // OPEN OTP TIMER (needs to be in hte grandparent component)
//   // const [openTimer, setOpenTimer] = useState(false);
//   // BUTTONS
//   const buttons = 
//     // <Box
//     //   sx={{
//     //     display: 'flex',
//     //     justifyContent: 'center',
//     //     gap: '5px',
//     //     flexDirection: { xs: 'column', sm: 'row' },
//     //     alignContent: 'flex-end',
//     //     flexWrap: 'wrap',
//     //   }}
//     // >
//         <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           gap: '5px',

//           flexWrap: 'wrap',
//         }}
//       >
//       {/* {role === 'clientAdmin' &&
//       proposal.status === 'sent' &&
//       selectedVersionNum === proposalVersions.length - 1 ? ( */}
//          {/* <AppCard sxStyle={{ width: '100%' }}> */}
//         <>
//           <Button
//             sx={{
//               padding: 0,
//               width: '100%',
//               mt: 4,
//               height: '40px',
//             }}
//             color='primary'
//             variant='contained'
//             type='submit'
//             onClick={handleClientEdit}
//             disabled={!(role === 'clientAdmin' &&
//       proposal.status === 'sent' &&
//       selectedVersionNum === proposalVersions.length - 1) }
//           >
//             Edit
//           </Button>
//           <Button
//             sx={{
//               padding: 0,
//               width: '100%',
//               mt: 4,
//               height: '40px',
//             }}
//             color='primary'
//             variant='contained'
//             type='submit'
//             onClick={() => setSign(true)}
//             disabled={!(role === 'clientAdmin' &&
//       proposal.status === 'sent' &&
//       selectedVersionNum === proposalVersions.length - 1) }
//           >
//             Sign Proposal
//           </Button>
//           </>
//          {/* </AppCard> */}
//        {/* ) : null} */}
//       {/* If status is sent, user is client, and they are on latest version, show signature box,
//         if client sing and user is business, show signature box, else show not signed message*/}
//       {proposal?.status === 'signed' ? (
//         <Box sx={{ width: '100%' }}>
//           <Typography sx={{ color: 'red', fontWeight: Fonts.BOLD, mb: 2 }}>
//             Proposal signed by both parties.
//           </Typography>
//           <Typography sx={{ fontWeight: 'bold' }}>
//             Client Signatory:
//             <SingleUser
//               user={proposal?.clientSignerId}
//               role={getRoles(proposal, proposal.clientSignerId).displayRole}
//             />
//           </Typography>

//           <Typography sx={{ fontWeight: 'bold' }}>
//             Business Signatory:
//             <SingleUser
//               user={proposal?.businessSignerId}
//               role={getRoles(proposal, proposal.businessSignerId).displayRole}
//             />
//           </Typography>
//         </Box>
//       ) : proposal?.status === 'clientSigned' &&
//         roleType === 'business' &&
//         selectedVersionNum === proposalVersions.length - 1 ? (
//         <AppCard title={'Proposal Status:'} sxStyle={{ width: '100%' }}>
//           <Typography sx={{ color: 'red', fontWeight: Fonts.BOLD, mb: 2 }}>
//             Signed by client. Waiting on business signature.
//           </Typography>
//           <Typography sx={{ fontWeight: 'bold', color: 'black' }}>
//             Client Signatory:
//             <SingleUser
//               user={proposal?.clientSignerId}
//               role={getRoles(proposal, proposal.clientSignerId).displayRole}
//               sxStyle={{ width: '100%' }}
//             />
//           </Typography>

//           <Button
//             sx={{
//               padding: 0,
//               width: '100%',
//               mt: 4,
//               height: '40px',
//             }}
//             color='primary'
//             variant='contained'
//             type='submit'
//             onClick={() => setSign(true)}
//           >
//             Sign Proposal
//           </Button>
//         </AppCard>
//       ) : proposal?.status === 'clientSigned' &&
//         roleType === 'client' &&
//         selectedVersionNum === proposalVersions.length - 1 ? (
        
            
//         <AppCard title={'Proposal Status:'} sxStyle={{ width: '100%', boxShadow: "0" }}>
       
//           <Typography sx={{ color: 'red', fontWeight: Fonts.BOLD, mb: 2 }}>
//             Waiting on business signature.
//           </Typography>
//           <Typography sx={{ fontWeight: 'bold', color: 'black' }}>
//             Client Signatory:
//             <SingleUser
//               user={proposal?.clientSignerId}
//               role={getRoles(proposal, proposal.clientSignerId).displayRole}
//               sxStyle={{ width: '100%' }}
//             />
//           </Typography>
//         </AppCard>
        
//       ):proposal?.status === 'sent' && !proposal.clientId ? (
//         <AppCard title={'Proposal Status:'} sxStyle={{ width: '100%',  boxShadow: "0" }}>
//           <Typography sx={{ color: 'red', fontWeight: Fonts.BOLD }}>
//             Not Yet Accepted By Client
//                   {roleStatusDisplay(proposal, {roleType: roleType})}
//           </Typography>
//         </AppCard>
//       ) : (
//           <Box sx={{ mt: 3,  width: '100%', display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", alignItems: "center"}}> 
//     <Typography sx={{ borderBottom: "1px solid", borderColor: grey[500], fontWeight: "bold", fontSize: "18px",}}>Proposal Status</Typography> 
//         <AppCard  sxStyle={{ width: '100%',  boxShadow: "0" }}>
//           <Typography sx={{ color: 'red', fontWeight: Fonts.BOLD,display: "flex", justifyContent: "center"  }}>
//             {/* Not Signed */}
//             {roleStatusDisplay({data: proposal, role: {roleType: roleType}})}
//           </Typography>
//         </AppCard>
//         </Box>
//       )}
//       {/* ADD SIGNATURE MODAL */}
//       <Signature
//         handleSumbitProposal={handleSumbitProposal}
//         handleSendClientSignature={handleSendClientSignature}
//         sign={sign}
//         setSign={setSign}
//         content={proposalVersion}
//         handleAddClientSignature={handleAddClientSignature}
//         handleAddBusinessSignature={handleAddBusinessSignature}
//         resetSignature={resetSignature}
//         openTimer={openTimer}
//         setOpenTimer={setOpenTimer}
//         proposal={proposal}
//         role={role}
//       />
//     </Box>
//   ;

//   return (
//     <ProposalSideMenu
//       buttons={buttons}
//       proposal={proposal}
//       proposalVersions={proposalVersions}
//       handleSelectVersion={handleSelectVersion}
//       role={role}
//       selectedVersionNum={selectedVersionNum}
//       status={status}
//       displayRole={displayRole}
//       roleType={roleType}
//     />
//   );
// };

// export default SentProposalSideMenu;



import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Signature from './Singnature';
import ProposalSideMenu from '../ProposalSideMenu';
import { Fonts } from '@crema/constants/AppEnums';
import SingleUser from 'modules/Users/AllProposalUsers/SingleUser';
import { getRoles } from 'utils/roleUtils';
import AppCard from '@crema/components/AppCard';
import { grey } from '@mui/material/colors';

import { roleStatusDisplay } from 'utils/roleStatusDisplay';
const SentProposalSideMenu = ({
  proposal,
  role,
  selectedVersionNum,
  proposalVersions,
  handleSelectVersion,
  status,
  displayRole,
  handleClientEdit,
  handleSumbitProposal,
  handleSendClientSignature,
  proposalVersion,
  handleAddClientSignature,
  handleAddBusinessSignature,
  resetSignature,
  openTimer,
  setOpenTimer,
  roleType,
}) => {
  const [sign, setSign] = useState(false);
  const [signatories, setSignatories] = useState({
    client: null,
    business: null,
  });



  // OPEN OTP TIMER (needs to be in hte grandparent component)
  // const [openTimer, setOpenTimer] = useState(false);
  // BUTTONS
  const buttons = 
        <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '5px',

          flexWrap: 'wrap',
        }}
      >

        <>
          <Button
            sx={{
              padding: 0,
              width: '100%',
              mt: 4,
              height: '40px',
            }}
            color='primary'
            variant='contained'
            type='submit'
            onClick={handleClientEdit}
            disabled={!(role === 'clientAdmin' &&
      proposal.status === 'sent' &&
      selectedVersionNum === proposalVersions.length - 1) }
          >
            Edit
          </Button>
          <Button
            sx={{
              padding: 0,
              width: '100%',
              mt: 4,
              height: '40px',
            }}
            color='primary'
            variant='contained'
            type='submit'
            onClick={() => setSign(true)}
                  /* If status is sent, user is client, and they are on latest version, show signature box,
        if client singed and user is business, show signature box, else show not signed message*/
            disabled={!((role === 'clientAdmin' ||role === 'clientApprover') &&
      proposal.status === 'sent' &&
      selectedVersionNum === proposalVersions.length - 1) && !(proposal?.status === 'clientSigned' &&
        roleType === 'business' &&
        selectedVersionNum === proposalVersions.length - 1) 

        ||  (roleType === 'Business' && proposal.status !== "clientSigned" ) && proposal.status === "signed" //necessary????
      }
          >
            Sign Proposal
          </Button>
          </>
    
      {/* ADD SIGNATURE MODAL */}
      <Signature
        handleSumbitProposal={handleSumbitProposal}
        handleSendClientSignature={handleSendClientSignature}
        sign={sign}
        setSign={setSign}
        content={proposalVersion}
        handleAddClientSignature={handleAddClientSignature}
        handleAddBusinessSignature={handleAddBusinessSignature}
        resetSignature={resetSignature}
        openTimer={openTimer}
        setOpenTimer={setOpenTimer}
        proposal={proposal}
        role={role}
      />
    </Box>
  ;

  return (
    <ProposalSideMenu
      buttons={buttons}
      proposal={proposal}
      proposalVersions={proposalVersions}
      handleSelectVersion={handleSelectVersion}
      role={role}
      selectedVersionNum={selectedVersionNum}
      status={status}
      displayRole={displayRole}
      roleType={roleType}
    />
  );
};

export default SentProposalSideMenu;
