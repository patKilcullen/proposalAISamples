import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  GET_SINGLE_BUSINESS,
  GET_BUSINESS_USERS,
  CREATE_NEW_BUSINESS,
  SHOW_MESSAGE,
  EDIT_BUSINESS,
  REMOVE_BUSINESS_USER,
} from '@crema/constants/ActionTypes';
import { appIntl } from '@crema/helpers/Common';
import jwtAxios from '@crema/services/auth/jwt-auth';

import { createAsyncThunk } from '@reduxjs/toolkit';

// CREATE BUSINESS
export const onCreateBusiness = (business) => {
  const { messages } = appIntl();

  return async (dispatch) => {
    dispatch({ type: FETCH_START, message: 'Creating business...' });

    try {
      const response = await jwtAxios.post('business/create', business);

      if (response.status === 201) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({
          type: CREATE_NEW_BUSINESS,
          payload: response.data,
        });
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
        payload: `Error Creating Business: ${
          error?.response?.data?.message ||
          error?.message ||
          'Something went wrong'
        }`,
      });
      throw error;
    }
  };
};

// GET BUSINESS/ BUSINESS INFO
export const onGetBusinessInfo = (id) => {
  return (dispatch) => {
    const { messages } = appIntl();
    dispatch({ type: FETCH_START });
    jwtAxios
      .get(`/business/${id}`)
      .then((data) => {
        if (data.status === 200) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: GET_SINGLE_BUSINESS, payload: data.data });
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: messages['message.somethingWentWrong'],
          });
        }
      })
      .catch((error) => {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};

// GET BUSINESS USERS
export const onGetBusinessUsers = (id) => {
  return (dispatch) => {
    const { messages } = appIntl();
    dispatch({ type: FETCH_START });
    jwtAxios
      .get(`/business/${id}/users`)
      .then((data) => {
        if (data.status === 200) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: GET_BUSINESS_USERS, payload: data.data.users });
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: messages['message.somethingWentWrong'],
          });
        }
      })
      .catch((error) => {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};

export const onEditPartialBusiness = (business) => {
  const { messages } = appIntl();

  return (dispatch) => {
    return jwtAxios

      .put(`/business/update/${business._id}`, business)
      .then((data) => {
        if (data.status === 200) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({
            type: EDIT_BUSINESS,
            payload: data.data.data,
          });
          dispatch({
            type: SHOW_MESSAGE,
            payload: data.data.message,
          });
          return data;
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: messages['message.somethingWentWrong'],
            message: 'Error updating businesss',
          });

          return null;
        }
      })
      .catch((error) => {
        dispatch({
          type: FETCH_ERROR,
          payload: `Error Updating Business: ${
            error?.response?.data?.message ||
            error?.message ||
            messages['message.somethingWentWrong']
          }`,
          // payload: error?.response?.data?.message || error?.message || messages['message.somethingWentWrong'],
        });

        throw error;
      });
  };
};

export const onJoinBusiness = (id) => {
  return (dispatch) => {
    const { messages } = appIntl();
    dispatch({ type: FETCH_START });
    jwtAxios
      // TODO NEED BACK END ROUTE
      .post(`/business/join/${id}`)
      .then((data) => {
        if (data.status === 200) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: REMOVE_BUSINESS_USER, payload: data.data.users });
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: messages['message.somethingWentWrong'],
          });
        }
      })
      .catch((error) => {
        // TODO DELETE:
        dispatch({ type: REMOVE_BUSINESS_USER, payload: { _id: id } });
        dispatch({ type: SHOW_MESSAGE, payload: 'Removed member' });
        //  DELTLE ABOVE

        // INCLUDE BELOW
        // dispatch({ type: FETCH_ERROR, payload: "failed to remove member" });
      });
  };
};

// OVE USER FROM BUSINES
export const onRemoveBusinessUser = (id) => {
  return (dispatch) => {
    const { messages } = appIntl();
    dispatch({ type: FETCH_START });
    jwtAxios
      // TODO NEED BACK END ROUTE
      .get(`/business/${id}/users`)
      .then((data) => {
        if (data.status === 200) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: REMOVE_BUSINESS_USER, payload: data.data.users });
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: messages['message.somethingWentWrong'],
          });
        }
      })
      .catch((error) => {
        // TODO DELETE:
        dispatch({ type: REMOVE_BUSINESS_USER, payload: { _id: id } });
        dispatch({ type: SHOW_MESSAGE, payload: 'Removed member' });
        //  DELTLE ABOVE

        // INCLUDE BELOW
        // dispatch({ type: FETCH_ERROR, payload: "failed to remove member" });
      });
  };
};
