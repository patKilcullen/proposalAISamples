import {
  FETCH_ERROR,
  GET_UNIQUE_EMAILS,
  FETCH_CONTACTS_SUCCESS,
  FETCH_CONTACTS_ERROR,
  FETCH_CONTACTS_START,
  ADD_CONTACTS,
} from '@crema/constants/ActionTypes';
import { appIntl } from '@crema/helpers/Common';
import jwtAxios from '@crema/services/auth/jwt-auth';

// GET BUSINESS USERS CONTACTS
export const onGetBusinessUserContacts = (id) => {

  return (dispatch) => {
    const { messages } = appIntl();
    dispatch({ type: FETCH_CONTACTS_START });
    jwtAxios
      .get(`/business/${id}/users`)
      .then((data) => {
        if (data.status === 200) {
          const businessUsers = data.data.users;
          //FILTER TO ONLY INCLUDE USERS EMAIL
          const usersWithEmail = businessUsers.filter((user) => user.email);

          // GET UNIQUE EMAILS TO SEND
          const userEmails = usersWithEmail.map((user) => user.email);

          // dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: FETCH_CONTACTS_SUCCESS });
          dispatch({ type: GET_UNIQUE_EMAILS, payload: userEmails });
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

export const onGetUserContacts = (id) => {
  const { messages } = appIntl();

  return async (dispatch) => {
    // USES UNIQUE FETCH STARt to include uniqule load when fetching client
    // to not interfere with regual loading and to add loading to contacts input
    dispatch({ type: FETCH_CONTACTS_START });

    try {
      const response = await jwtAxios.get(`/users/get/${id}/contacts`);

      if (response.status === 200) {
        //  STOP CONTACTS LOADING
        dispatch({ type: FETCH_CONTACTS_SUCCESS });

        if (response?.data?.contacts) {
          dispatch({
            type: GET_UNIQUE_EMAILS,
            payload: response.data.contacts,
          });
        }
        return response.data.contacts;
      } else {
        //  STOP CONTACTS LOADING
        dispatch({
          type: FETCH_CONTACTS_ERROR,
        });
        dispatch({
          type: FETCH_ERROR,
          payload: messages['message.somethingWentWrong'],
        });
      }
    } catch (error) {
      //  STOP CONTACTS LOADING
      dispatch({
        type: FETCH_CONTACTS_ERROR,
      });
      dispatch({
        type: FETCH_ERROR,
        payload: `Error Getting Contacts: ${
          error?.response?.data?.message ||
          error?.message ||
          'Something went wrong'
        }`,
      });
    }
  };
};

export const onAddContacts = (contacts) => {
  const { messages } = appIntl();

  return (dispatch) => {
    return jwtAxios
      .put(`/users/add-contacts`, { contacts })
      .then((data) => {
        if (data.status === 201) {
          dispatch({ type: ADD_CONTACTS, payload: data.data.newContacts });
        } else {
          console.error('Error adding contacts');
        }
      })
      .catch((error) => {
        console.error('Error adding contacts', error);
      });
  };
};
