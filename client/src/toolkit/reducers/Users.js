import { GET_SINGLE_USER, CREATE_USER } from '@crema/constants/ActionTypes';
import { createReducer } from '@reduxjs/toolkit';

// INITIAL STATE
const initialState = {
  usersList: [],
  singleUser: {},
  loading: false,
};

const businessListReducer = createReducer(initialState, (builder) => {
  builder.addCase(GET_SINGLE_USER, (state, action) => {
    state.singleUser = action.payload;
  });
});

export default businessListReducer;
