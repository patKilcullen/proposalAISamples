import React, { useEffect } from 'react';
import CreateBusinessForm from '../../../../business/BusinessInfo/CreateBusinessForm';
const ClientInfo = ({ setFieldValue, createProposal }) => {
  return (
    <CreateBusinessForm setFieldValue={setFieldValue} clientBusiness={true} />
  );
};

export default ClientInfo;
