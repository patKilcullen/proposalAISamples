import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Fonts } from '@crema/constants/AppEnums';
import SingleUser from 'modules/Users/AllProposalUsers/SingleUser';
import { getRoles } from 'utils/roleUtils';
import AppCard from '@crema/components/AppCard';
import { grey } from '@mui/material/colors';
import { roleStatusDisplay } from 'utils/roleStatusDisplay';

const ProposalStatus = ({ proposal, roleType }) => {
  const [status, setStatus] = useState('');
  // Get STATUS bases on role and proposal status
  useEffect(() => {
    if (roleType) {
      setStatus(roleStatusDisplay(proposal, { roleType: roleType }));
    }
  }, [roleType]);

  // if the signatories is business admin, set as busines admin, if approver, set approver
  const [signatories, setSignatores] = useState({
    client: { role: '', name: '', user: '', isBusiness: false },
    business: { role: '', name: '', user: '', isBusiness: false },
  });

  useEffect(() => {
    let businessRole = getRoles(proposal, proposal?.businessSignerId);
    let clientRole = getRoles(proposal, proposal?.clientSignerId);

    setSignatores({
      ...signatories,
      business: {
        user:
          businessRole.role === 'businessAdmin'
            ? proposal?.businessId
            : proposal?.businessSignerId,
        name:
          businessRole.role === 'businessAdmin'
            ? proposal?.businessId.businessName
            : proposal?.businessSignerId?.userName,
        isBusiness: businessRole.role === 'businessAdmin' ? true : false,
        role: businessRole,
      },
      // CLIENT; if client has business, set businss info to be dispalyed, otherwise set clients user info
      client: {
        user:
          clientRole.role === 'clientAdmin' && proposal.clientId.businessId 
            ? proposal?.clientId.businessId
            : clientRole.role === 'clientAdmin'&& !proposal.clientId.businessId 
            ? proposal?.clientId
            : proposal?.clientSignerId,
        name:
          clientRole.role === 'clientAdmin'&& proposal.clientId.businessId ?
          proposal?.clientId.businessId.businessName : 
          clientRole.role === 'clientAdmin'&& !proposal.clientId.businessId ?
             proposal?.clientId.userName
            : proposal?.clientSignerId?.userName,
         isBusiness: clientRole.role === 'clientAdmin' && proposal.clientId.businessId ? true : false,
        role: clientRole,
      },
    });
   
  }, []);

  return (
    // PROPOSAL STATUS
    <AppCard sx={{ boxShadow: '0', borderColor: grey[500], borderRadius: '0' }}>
      <Box
        sx={{
          mt: 1,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{
            borderBottom: '1px solid',
            borderColor: grey[500],
            fontWeight: 'bold',
            fontSize: '18px',
          }}
        >
          Proposal Status
        </Typography>
        <AppCard
          sxStyle={{
            width: '250px',
            boxShadow: '0',
            borderBottom: '1px solid',
            borderColor: grey[500],
            borderRadius: '0',
          }}
        >
          <Typography
            sx={{
              color: 'red',
              fontWeight: Fonts.BOLD,
              display: 'flex',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            {`${status}.`}
          </Typography>
        </AppCard>
      </Box>

      {/* SIGNATORIES */}
      {proposal?.status === 'signed' || proposal?.status === 'clientSigned' ? (
        <Box
          sx={{
            mt: 3,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              borderBottom: '1px solid',
              borderColor: grey[500],
              fontWeight: 'bold',
              fontSize: '18px',
            }}
          >
            Signatories
          </Typography>
          <AppCard
            sx={{
              boxShadow: '0',
              overflow: 'auto',
              width: '250px',
              borderBottom: '1px solid',
              borderColor: grey[500],
              borderRadius: '0',
            }}
          >
            {proposal?.status === 'signed' && (
              <>
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  Business Signatory:
                </Typography>
                <SingleUser
                  user={signatories?.business?.user}
                  isBusiness={signatories.business.isBusiness}
                  business={signatories.business.name}
                  role={signatories.business.role}
                  businessType={'business'}
                />
              </>
            )}
            <Typography
              sx={{
                fontWeight: 'bold',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              Client Signatory:
            </Typography>
            <SingleUser
              businessType={'client'}
              user={signatories?.client?.user}
              isBusiness={signatories.client.isBusiness}
              business={signatories.client.name}
              role={signatories.client.role}
            />
          </AppCard>
        </Box>
      ) : null}
    </AppCard>
  );
};

export default ProposalStatus;
