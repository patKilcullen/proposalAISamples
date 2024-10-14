import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  HIDE_MESSAGE,
  SHOW_MESSAGE,
  TOGGLE_APP_DRAWER,
  UPDATING_CONTENT,
  FETCH_START_OTP,
  FETCH_SUCCESS_OTP,
} from '@crema/constants/ActionTypes';
import { createReducer } from '@reduxjs/toolkit';

const INIT_STATE = {
  error: '',
  loading: false,
  isAppDrawerOpen: false,
  updatingContent: false,
   message: '',
  

  loading_otp: false,
  unauthorized: false
};

const commonReducer = createReducer(INIT_STATE, (builder) => {
  builder
    .addCase(FETCH_START, (state, action) => {
      state.error = '';
      state.message = action.message;
      state.loading = true;
    })
    .addCase(UPDATING_CONTENT, (state, action) => {
      state.error = '';
      state.message = '';
      state.updatingContent = true;
    })
    .addCase(FETCH_SUCCESS, (state, action) => {
      state.error = '';
       state.message = action.message;

      state.loading = false;
      state.updatingContent = false;
    })
    .addCase(SHOW_MESSAGE, (state, action) => {
      state.error = '';
      state.message = action.payload;

      state.loading = false;
      state.updatingContent = false;
    })
    .addCase(FETCH_ERROR, (state, action) => {
      state.error = action.payload;
      state.message = action.message;
      state.loading = false;
      state.updatingContent = false;
    })
    .addCase(HIDE_MESSAGE, (state, action) => {
      state.error = '';
      state.message = '';
      state.loading = false;
      state.updatingContent = false;
    })
    .addCase(TOGGLE_APP_DRAWER, (state, action) => {
      state.isAppDrawerOpen = !state.isAppDrawerOpen;
    })
    .addCase(FETCH_START_OTP, (state, action) => {
      state.message = action.message;
      state.loading_otp = true;
    })
    .addCase(FETCH_SUCCESS_OTP, (state, action) => {
      state.message = action.message;
      state.loading_otp = false;
    })

    
});


export default commonReducer;

