import { createSlice } from '@reduxjs/toolkit';

import {
  GET_SINGLE_PROPOSAL,
  EDIT_PROPOSAL,
  DELETE_PROPOSAL,
  GET_BUSINESS_PROPOSALS,
  GET_CLIENT_PROPOSALS,
  UPDATE_TEXT,
  FETCH_UPDATE_AI_START,
  EDIT_PARTIAL_PROPOSAL,
  CREATE_NEW_PROPOSAL,
  EDIT_PROPOSAL_REVISION,
  EDIT_PROPOSAL_CURRENT_VERSION,
  GET_USER_PROPOSALS,
  ADD_PROPOSAL,
} from '@crema/constants/ActionTypes';

import {
  onEditProposalRevision,
  onEditProposalCurrentVersion,
  onAutoSave,
} from '../actions/Proposals';

const initialState = {
  proposals: [],
  proposal: {},
  loading: false,
  error: null,
  proposalVersion: '',
  sentProposal: {},
  updatedText: null,
  autoSaveError: false,
  allProposalUsers: {},
};

const proposalReducer = createSlice({
  name: 'proposal',
  initialState,
  reducers: {
    // Clear updated text from AI
    clearUpdatedText: (state, action) => {
      state.updatedText = '';
    },
    // Remove Proposal from store
    removeProposal: (state, action) => {
      state.proposal = {};
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(CREATE_NEW_PROPOSAL, (state, action) => {
        state.proposal = action.payload;
      })
      .addCase(GET_SINGLE_PROPOSAL, (state, action) => {
        state.proposal = action.payload;
        state.allProposalUsers = {
          clientCollaborators: action.payload.clientCollaborators,
          businessCollaborators: action.payload.businessCollaborators,
          clientApprovers: action.payload.clientApprovers,
          businessApprovers: action.payload.businessApprovers,
        };
      })
      .addCase(EDIT_PROPOSAL, (state, action) => {
        state.proposal = action.payload;
      })
      .addCase(DELETE_PROPOSAL, (state, action) => {
        // filter for al propolsa except deleted one
        state.proposals = state.proposals.filter(
          (proposal) => proposal._id !== action.payload,
        );
      })
      .addCase(GET_BUSINESS_PROPOSALS, (state, action) => {
        state.proposals = action.payload.data;
      })
      .addCase(GET_USER_PROPOSALS, (state, action) => {
        state.proposals = action.payload;
      })
      .addCase(GET_CLIENT_PROPOSALS, (state, action) => {
        state.proposals = action.payload.data;
      })
      .addCase(EDIT_PARTIAL_PROPOSAL, (state, action) => {
        state.proposal = action.payload;
      })
      .addCase(EDIT_PROPOSAL_REVISION, (state, action) => {
        state.proposal = action.payload;
      })
      .addCase(EDIT_PROPOSAL_CURRENT_VERSION, (state, action) => {
        state.proposal = action.payload;
      })
      .addCase(onAutoSave.fulfilled, (state, action) => {
        // if payload, update proposal state and ensure save error off, else(if error) dont update state and set error
        if (action.payload?.data) {
          state.proposal = action.payload.data;
          state.autoSaveError = false;
        } else {
          state.autoSaveError = true;
        }
      })

      .addCase(UPDATE_TEXT, (state, action) => {
        state.updatedText = action.payload;
        state.loading = false;
      })
      .addCase(FETCH_UPDATE_AI_START, (state, action) => {
        state.loading = true;
      })
      .addCase(ADD_PROPOSAL, (state, action) => {
        state.proposal = action.payload;
      });
  },
});

export const selectProposal = (state) => state.proposals.proposal;

export const selectProposals = (state) => state.proposals.proposals;

export const autoSaveError = (state) => state.proposals.autoSaveError;

export const { clearUpdatedText, removeProposal } = proposalReducer.actions;
export default proposalReducer.reducer;
