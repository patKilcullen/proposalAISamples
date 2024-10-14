// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import Stakeholder from 'modules/Components/Stakeholder';
// import { Box, Typography } from '@mui/material';
// import { onGetOtherUser } from 'toolkit/actions';
// import AllProposalUsers from 'modules/Users/AllProposalUsers/UsersList';

// const Stakeholders = () => {
//   const dispatch = useDispatch();
//   const proposal = useSelector(({ proposals }) => proposals.proposal);

//   const [businessUsers, setBusinessUsers] = useState([]);
//   const [clientUsers, setClientUsers] = useState([]);

//   // ADD CLIENT users and Business users associated with propsal... will look different when all of that info is in proposal in DB
//   useEffect(() => {
//     dispatch(onGetOtherUser(proposal?.clientId?._id)).then((res) => {
//       setClientUsers([...clientUsers, res?.data?.user]);
//     });
//   }, []);

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//       <Typography sx={{ fontWeight: 'bold', fontSize: '20px', mb: 3 }}>
//         Stakeholders
//       </Typography>
//       <Box>
//         <Typography
//           sx={{
//             fontWeight: 'bold',
//             fontSize: '15px',

//             // marginLeft: '-50px',
//           }}
//         >
//           Business Stakeholders
//         </Typography>
//         {businessUsers.length > 0
//           ? businessUsers.map((user, index) => (
//               <Stakeholder
//                 key={index}
//                 user={user}
//                 stakeholders={true}
//                 businessSigner={proposal?.businessSignerId}
//               />
//             ))
//           : null}
//         <Typography
//           sx={{
//             fontWeight: 'bold',
//             fontSize: '15px',

//             // marginLeft: '-50px',
//           }}
//         >
//           Client Stakeholders
//         </Typography>
//         {clientUsers.length > 0
//           ? clientUsers.map((user, index) => (
//               <Stakeholder
//                 key={index}
//                 user={user}
//                 stakeholders={true}
//                 clientSigner={proposal?.clientSignerId}
//               />
//             ))
//           : null}
//       </Box>
//     </Box>
//   );
// };

// export default Stakeholders;
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Stakeholder from 'modules/Components/Stakeholder';
import { Box, Typography } from '@mui/material';
import { onGetOtherUser } from 'toolkit/actions';
import AllProposalUsers from 'modules/Users/AllProposalUsers/UsersList';

const Stakeholders = () => {
  const dispatch = useDispatch();
  const proposal = useSelector(({ proposals }) => proposals.proposal);

  const [businessUsers, setBusinessUsers] = useState([]);
  const [clientUsers, setClientUsers] = useState([]);

  // ADD CLIENT users and Business users associated with propsal... will look different when all of that info is in proposal in DB
  useEffect(() => {
    dispatch(onGetOtherUser(proposal?.clientId?._id)).then((res) => {
      setClientUsers([...clientUsers, res?.data?.user]);
    });
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography sx={{ fontWeight: 'bold', fontSize: '20px', mb: 3 }}>
        Stakeholders
      </Typography>
      <AllProposalUsers proposal={proposal} stakeholders={true} />
      
    </Box>
  );
};

export default Stakeholders;
