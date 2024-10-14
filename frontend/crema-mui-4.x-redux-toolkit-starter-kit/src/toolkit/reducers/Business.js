import {
  GET_SINGLE_BUSINESS,
  GET_BUSINESS_USERS,
  EDIT_BUSINESS,
  REMOVE_BUSINESS_USER,
  CREATE_NEW_BUSINESS,
} from '@crema/constants/ActionTypes';
import { createReducer } from '@reduxjs/toolkit';
import { onCreateBusiness } from '../actions';

// INITIAL STATE
const initialState = {
  usersList: [],
  singleBusiness: {},
  loading: false,
};

const businessListReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(GET_SINGLE_BUSINESS, (state, action) => {
      state.singleBusiness = action.payload;
    })
    .addCase(GET_BUSINESS_USERS, (state, action) => {
      state.usersList = action.payload;
    })
    .addCase(CREATE_NEW_BUSINESS, (state, action) => {
      state.loading = false;
      state.singleBusiness = action.payload;
    })
    .addCase(EDIT_BUSINESS, (state, action) => {
      state.loading = false;
      state.singleBusiness = action.payload;
    })
    .addCase(REMOVE_BUSINESS_USER, (state, action) => {
      state.loading = false;
      state.usersList = state.usersList.filter(
        (user) => user._id !== action.payload._id,
      );
    });
});

export default businessListReducer;
