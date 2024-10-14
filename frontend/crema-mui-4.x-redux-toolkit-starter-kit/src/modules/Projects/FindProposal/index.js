import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuthUser } from '@crema/hooks/AuthHooks';
import { Formik } from 'formik';
import * as yup from 'yup';

import FindProposalForm from './FindProposalFrom';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

import { onEditPartialProposal } from '../../../toolkit/actions';

import AppLoader from '@crema/components/AppLoader';

const validationSchema = yup.object({
  proposalId: yup.string().required('Required'),
});
// NEED CREATE PROPOSAL ANYMORE??????
const FindProposal = () => {
  const { user } = useAuthUser();
  const { loading } = useSelector(({ common }) => common);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: 'relative',
        maxWidth: 550,
      }}
    >
      <Formik
        validateOnBlur={true}
        validateOnChange={true}
        initialValues={{
          proposalId: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (data, { setSubmitting }) => {
          setSubmitting(true);
          try {
            // JOIN PROPOSAL: edits the proposal to have user as clientID
            dispatch(
              onEditPartialProposal({
                _id: data.proposalId,
                creator: user._id,
                clientId: user._id,
              }),
            ).then((res) => {
              navigate('/client-projects');
            });
          } catch (error) {
            console.log('ERROR IN FIND PROPOSAL');
          }
        }}
      >
        {({ values, setFieldValue }) => {
          return loading ? <AppLoader /> : <FindProposalForm />;
        }}
      </Formik>
    </Box>
  );
};

export default FindProposal;

FindProposal.propTypes = {
  setFieldValue: PropTypes.func,
  values: PropTypes.string,
};
