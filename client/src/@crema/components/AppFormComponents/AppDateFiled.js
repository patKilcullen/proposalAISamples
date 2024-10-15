import React from 'react';
import { Field } from 'formik';
import { DatePicker } from '@mui/x-date-pickers';
import PropTypes from 'prop-types';

const AppDateFiled = (props) => {
  return <Field component={DatePicker} {...props} />;
};

export default AppDateFiled;

AppDateFiled.propTypes = {
  className: PropTypes.string,
};
