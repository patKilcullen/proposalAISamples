import {
  GET_UNIQUE_EMAILS,
  FETCH_CONTACTS_START,
  FETCH_CONTACTS_SUCCESS,
  FETCH_CONTACTS_ERROR,
  ADD_CONTACTS,
} from '@crema/constants/ActionTypes';
import { createReducer } from '@reduxjs/toolkit';

// INITIAL STATE
const initialState = {
  contacts: [],
  loadingContacts: false,
  message: '',
};

const contactsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(GET_UNIQUE_EMAILS, (state, action) => {
      state.contacts = action.payload.map((contact) => contact.email);
    })
    .addCase(FETCH_CONTACTS_START, (state, action) => {
      state.message = action.message;
      state.loadingContacts = true;
    })
    .addCase(FETCH_CONTACTS_SUCCESS, (state, action) => {
      state.message = '';
      state.loadingContacts = false;
    })
    .addCase(FETCH_CONTACTS_ERROR, (state, action) => {
      state.message = 'Failed to load contacts...';
      state.loadingContacts = false;
    })
    .addCase(ADD_CONTACTS, (state, action) => {
      state.loadingContacts = false;
      state.contacts = action.payload.map((contact) => contact.email);
    });
});

export default contactsReducer;
