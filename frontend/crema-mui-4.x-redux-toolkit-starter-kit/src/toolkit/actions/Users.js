import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  GET_SINGLE_USER,
  CREATE_USER,
  SHOW_MESSAGE,
  ADD_PROPOSAL
} from '@crema/constants/ActionTypes';
import { appIntl } from '@crema/helpers/Common';
import jwtAxios from '@crema/services/auth/jwt-auth';

// GET USER - user for user of application
export const onGetUser = (id) => {
  return (dispatch) => {

    const { messages } = appIntl();
    dispatch({ type: FETCH_START });

    jwtAxios
      .get(`/users/get/${id}`)
      .then((data) => {
       
        if (data.status === 200) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: GET_SINGLE_USER, payload: data.data });
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


// GET BUSINESS/ BUSINESS INFO
export const onGetOtherUser = (id) => {
  return (dispatch) => {
    const { messages } = appIntl();
    // dispatch({ type: FETCH_START });
  
    return jwtAxios
      .get(`/users/get/${id}`)
      .then((data) => {
     
        if (data.status === 200) {
          // dispatch({ type: FETCH_SUCCESS });
 return data
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

export const onCreateUser = (user) => {
  
  return (dispatch) => {
    const { messages } = appIntl();
    dispatch({ type: FETCH_START });
    return jwtAxios
      .post(`/users/create`, user)
      .then((response) => {
        if (response.status === 201) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: CREATE_USER, payload: response.data });
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: messages['message.somethingWentWrong'],
            message: 'Error Creating User',
          });
        }

        return response.data;
      })
      .catch((error) => {
        dispatch({
          type: FETCH_ERROR,
          payload: error.message,
          message: 'Error Creating User',
        });

        throw error;
      });
  };
};

export const onUpdateUser = (user) => {
  const { messages } = appIntl();
  return (dispatch) => {
    
    return jwtAxios
      .put(`users/update-user/${user._id}`, user)
      .then((data) => {
        
        if (data.status === 200) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({
            type: SHOW_MESSAGE,
            payload: 'updated user',
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
          payload: `Error Updating User" ${error?.response?.data?.message || error?.message || "Something went wrong"}` 
        });
        // return null;
           throw error
      });
  };
};



export const onVerifyUserEmail = ({ id, token }) => {
  return (dispatch) => {
    const { messages } = appIntl();
    dispatch({ type: FETCH_START });

    return jwtAxios
      .get(`/users/verify/${id}/${token}`)
      .then((data) => {
 
        if (data.status === 200) {
          dispatch({ type: FETCH_SUCCESS, message: "Email verified" });
          // return data so that dispatch function navigates to home page if verified
          return data; 
        } else {
   
             dispatch({ type: FETCH_ERROR, payload: "Failed to verify email"});
        }
      })
      .catch((error) => {
        // dispatch({ type: FETCH_ERROR, payload: error.response.data.message });
        dispatch({type: FETCH_ERROR,payload:  `Error Verifying Email: ${error?.response?.data?.message || error?.message || 'Something went wrong'}`})
      //  throw `Error Verifying EMail: ${error?.response?.data?.message || error?.message || 'Something went wrong'}`
    throw `Error Verifying Email: ${error?.response?.data?.message || error?.message || 'Something went wrong'}`
    });
     
  };
};


