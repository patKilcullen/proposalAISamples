import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  SHOW_MESSAGE,
  FETCH_START_OTP,
  FETCH_SUCCESS_OTP,
} from '@crema/constants/ActionTypes';
import { appIntl } from '@crema/helpers/Common';
import jwtAxios from '@crema/services/auth/jwt-auth';

import { createAsyncThunk } from '@reduxjs/toolkit';

// SEND PROPOSAL
export const onSendProposal = ({ proposal, role }) => {
  const { messages } = appIntl();

  return async (dispatch) => {
    dispatch({
      type: FETCH_START,
      message: `Sending Proposal to ${proposal.clientEmail}... `,
    });

    try {
      const response = await jwtAxios.post(`business/proposal/send-link`, {
        proposal,
        role,
      });

      if (response.status === 200) {
        dispatch({
          type: FETCH_SUCCESS,
          payload: 'pay email sent',
          message: 'mess email sent',
        });
        dispatch({ type: SHOW_MESSAGE, payload: 'email sent' });
        return response.data;
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: messages['message.somethingWentWrong'],
        });
        throw new Error(messages['message.somethingWentWrong']);
      }
    } catch (error) {
      dispatch({
        type: FETCH_ERROR,
      });
      throw `Error Sending ${proposal.clientEmail} Email: ${
        error?.response?.data?.message ||
        error?.message ||
        'Something went wrong'
      }`;
    }
  };
};

// SEND PROPOSAL
export const onSendUserInvite = ({
  proposal,
  role,
  clientName,
  clientEmail,
}) => {
  const { messages } = appIntl();
  return async (dispatch) => {
    dispatch({
      type: FETCH_START,
      message: `Sending Proposal to ${clientEmail}... `,
    });

    try {
      const response = await jwtAxios.post(`business/proposal/send-invite`, {
        proposal,
        role,
        clientName,
        clientEmail,
      });

      if (response.status === 200) {
        dispatch({
          type: FETCH_SUCCESS,
          payload: 'pay email sent',
          message: 'mess email sent',
        });
        dispatch({ type: SHOW_MESSAGE, payload: 'email sent' });
        return response.data;
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: messages['message.somethingWentWrong'],
        });
        throw new Error(messages['message.somethingWentWrong']);
      }
    } catch (error) {
      dispatch({
        type: FETCH_ERROR,
        payload: `Error Sending Invite Email: ${
          error?.response?.data?.message ||
          error?.message ||
          'Something went wrong'
        }`,
      });
    }
  };
};

// SAVE PDF
export const onSavePdf = (proposal) => {
  const { messages } = appIntl();

  return async (dispatch) => {
    dispatch({ type: FETCH_START, message: 'Creating Proposal PDF...' });

    try {
      const response = await jwtAxios.post(
        `business/proposal/save-pdf/${proposal.id}`,
        proposal,
      );

      if (response.status === 200) {
        dispatch({ type: FETCH_SUCCESS });
        return response.data;
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: messages['message.somethingWentWrong'],
        });
        throw new Error(messages['message.somethingWentWrong']);
      }
    } catch (error) {
      console.error('ERROR SAVING PDF: ', error);

      throw (
        error?.response?.data?.message ||
        error?.message ||
        'Something went wrong'
      );
    }
  };
};

// SEND PDF
export const onSendPdf = (proposal) => {
  const { messages } = appIntl();

  return async (dispatch) => {
    dispatch({ type: FETCH_START, message: 'Sending Proposal PDF...' });

    try {
      const response = await jwtAxios.post(`business/proposal/send-pdf`, {
        proposal,
      });

      if (response.status === 200) {
        dispatch({ type: FETCH_SUCCESS });
        return response.data;
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: messages['message.somethingWentWrong'],
        });
        throw new Error(messages['message.somethingWentWrong']);
      }
    } catch (error) {
      console.error('ERROR SENDING PDF: ', error);

      throw (
        error?.response?.data?.message ||
        error?.message ||
        'Something went wrong'
      );
    }
  };
};

// SEND NEW MEMBER EMAIL
export const onSendNewMemberEmail = createAsyncThunk(
  'add-member',
  async (proposal, { dispatch }) => {
    try {
      const { messages } = appIntl();
      dispatch({ type: FETCH_START });
      const response = await jwtAxios.post(`business/proposal/send-pdf`, {
        proposal,
      });
      if (response.status === 200) {
        dispatch({ type: FETCH_SUCCESS });
        return response.data;
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: messages['message.somethingWentWrong'],
        });
        throw new Error(messages['message.somethingWentWrong']);
      }
    } catch (error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
      throw new Error(error.message);
    }
  },
);

export const sendVerificationEmail = (user) => {
  return (dispatch) => {
    const { messages } = appIntl();
    dispatch({ type: FETCH_START });

    return jwtAxios
      .post(`/users/send-email-verification`, { user })
      .then((data) => {
        if (data.status === 201) {
          dispatch({ type: FETCH_SUCCESS, message: data.data.message });
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: messages['message.somethingWentWrong'],
          });
        }
      })
      .catch((error) => {
        const errorMessage = `Error Sending Verification Email: ${
          error?.response?.data?.message ||
          error?.message ||
          messages['message.somethingWentWrong']
        }`;

        dispatch({ type: FETCH_ERROR, payload: errorMessage });
        throw errorMessage;
      });
  };
};

export const requestPasswordReset = (user) => {
  return (dispatch) => {
    const { messages } = appIntl();
    dispatch({ type: FETCH_START });
    return jwtAxios
      .post(`/users/request-passwordreset`, user)
      .then((data) => {
        dispatch({ type: FETCH_SUCCESS });
        return data.data;
      })
      .catch((error) => {
        console.error('Error Requesting Password Reset: ', error);
        throw (
          error?.response?.data?.message ||
          error?.message ||
          'Something went wrong'
        );
      });
  };
};

export const resetPassword = ({ userId, token }) => {
  return (dispatch) => {
    const { messages } = appIntl();
    dispatch({ type: FETCH_START });

    return jwtAxios
      .get(`/users/reset-password/${userId}/${token}`)
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: FETCH_SUCCESS });
          return response;
        } else {
          dispatch({ type: FETCH_ERROR });
        }
      })
      .catch((error) => {
        dispatch({ type: FETCH_ERROR, message: error.response.data.message });
        return error.response.data.message;
      });
  };
};

export const changePassword = ({ userId, password }) => {
  return (dispatch) => {
    const { messages } = appIntl();
    dispatch({ type: FETCH_START });

    return jwtAxios
      .post(`/users/reset-password/${userId}`, {
        password,
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({
            type: SHOW_MESSAGE,
            payload: 'Password successfully changed',
          });
          return response;
        } else {
          dispatch({ type: FETCH_ERROR, payload: 'Error Changing Password' });
        }
      })
      .catch((error) => {
        dispatch({ type: FETCH_ERROR, payload: 'Error Changing Password' });
      });
  };
};

export const oneTimePassword = () => {
  return (dispatch) => {
    const { messages } = appIntl();
    dispatch({
      type: FETCH_START_OTP,
      message: 'Sending one time password...',
    });
    return jwtAxios
      .post(`business/proposal/send-otp`)
      .then((response) => {
        if (response.status === 201) {
          dispatch({ type: FETCH_SUCCESS_OTP });
          dispatch({
            type: SHOW_MESSAGE,
            payload: 'OTP Sent',
          });
          return response;
        } else {
          dispatch({ type: FETCH_ERROR, payload: 'Error sending OTP' });
        }
      })
      .catch((error) => {
        console.error(error);

        throw (
          error?.response?.data?.message ||
          error?.message ||
          'Something went wrong'
        );
      });
  };
};

export const verifyOtp = (otp) => {
  return (dispatch) => {
    const { messages } = appIntl();

    return jwtAxios
      .post(`business/proposal/verify-otp`, { otp })
      .then((response) => {
        if (response.status === 201) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({
            type: SHOW_MESSAGE,
            payload: 'OTP Verified',
          });
          return response;
        } else {
          dispatch({ type: FETCH_ERROR, payload: 'Error verifying OTP' });
        }
      })
      .catch((error) => {
        console.error(error);
        throw (
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.message ||
          'Something went wrong'
        );
      });
  };
};

export const verifyProposal = (proposal) => {
  return (dispatch) => {
    const { messages } = appIntl();

    return jwtAxios

      .post(`/business/proposal/verify-proposal`, proposal)
      .then((response) => {
        if (response.status === 201) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({
            type: SHOW_MESSAGE,
            payload: 'OTP Verified',
          });
          return response;
        } else {
          dispatch({ type: FETCH_ERROR, payload: 'Error verifying OTP' });
        }
      })
      .catch((error) => {
        dispatch({ type: FETCH_ERROR, payload: 'Error verifying OTP' });
        throw (
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.message ||
          'Something went wrong'
        );
      });
  };
};



export const onSendSupportMessage = ({message, subject}) => {
  return (dispatch) => {
    const { messages } = appIntl();
   dispatch({
      type: FETCH_START,
      message: 'Sending support message.',
    });
    return jwtAxios

      .post(`/users/send-support-message`, {message, subject})
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({
            type: SHOW_MESSAGE,
            payload: 'Message sent to support',
          });
          return response;
        } else {
          dispatch({ type: FETCH_ERROR, payload: 'Error sending support message' });
        }
      })
      .catch((error) => {
        dispatch({ type: FETCH_ERROR, payload: 'Error sending support message' });
        throw (
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.message ||
          'Something went wrong'
        );
      });
  };
};
