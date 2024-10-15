import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  CREATE_NEW_PROPOSAL,
  GET_SINGLE_PROPOSAL,
  EDIT_PROPOSAL,
  DELETE_PROPOSAL,
  GET_BUSINESS_PROPOSALS,
  GET_USER_PROPOSALS,
  GET_CLIENT_PROPOSALS,
  UPDATE_TEXT,
  FETCH_UPDATE_AI_START,
  EDIT_PARTIAL_PROPOSAL,
  EDIT_PROPOSAL_REVISION,
  EDIT_PROPOSAL_CURRENT_VERSION,
  ADD_PROPOSAL,
} from '@crema/constants/ActionTypes';
import { appIntl } from '@crema/helpers/Common';
import jwtAxios from '@crema/services/auth/jwt-auth';

import { createAsyncThunk } from '@reduxjs/toolkit';

// GENERATE PROPOSAL
export const onGenerateProposal = createAsyncThunk(
  'proposal/create',
  async (proposal, { dispatch }) => {
    try {
      const { messages } = appIntl();
      dispatch({
        type: FETCH_START,
        message: 'ProposalAI is generating your proposal.',
      });
      const response = await jwtAxios.post(
        `business/proposal/create-proposal`,
        proposal,
      );

      if (response.status === 201) {
        dispatch({ type: CREATE_NEW_PROPOSAL, payload: response.data });
        return response.data;
      } else {
        dispatch({ type: FETCH_ERROR, payload: response.data });
      }
    } catch (error) {
      dispatch({
        type: FETCH_ERROR,
      });
      throw error;
    }
  },
);

// GENERATE TEST PROPOSAL
export const onGenerateProposalTEST = createAsyncThunk(
  'proposal/create',
  async (proposal, { dispatch }) => {
    const { messages } = appIntl();

    try {
      dispatch({
        type: FETCH_START,
        message: 'ProposalAI is generating your proposal.',
      });
      const response = await jwtAxios.post(
        `business/proposal/create-proposal-test`,
        proposal,
      );
      if (response.status === 201) {
        dispatch({ type: CREATE_NEW_PROPOSAL, payload: response.data });
        return response.data;
      } else {
        throw new Error(messages['message.somethingWentWrong']);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },
);

// TEST APP INFO VIEW... used for testing stack app info view
// TODO: Add to dev mode
export const AppInforViewTest = createAsyncThunk(
  'testy',
  async (proposal, { dispatch }) => {
    const { messages } = appIntl();

    try {
      dispatch({ type: FETCH_SUCCESS, message: 'UNO.' });
      setTimeout(() => {
        dispatch({ type: FETCH_SUCCESS, message: 'dos.' });
        setTimeout(() => {
          dispatch({ type: FETCH_SUCCESS, message: 'TRES.' });
        }, 500);
      }, 500);
    } catch (error) {
      throw new Error(error.message);
    }
  },
);

// GET BUSINESS PROPOSALS
export const onGetBusinessProposals = (businessId) => {
  const { messages } = appIntl();

  return (dispatch) => {
    dispatch({ type: FETCH_START, message: 'Fetching proposals...' });
    jwtAxios
      .get(`business/proposal/get-business-proposals/${businessId}`)
      .then((data) => {
        if (data.status === 200) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: GET_BUSINESS_PROPOSALS, payload: data.data });
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: messages['message.somethingWentWrong'],
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: FETCH_ERROR,
          payload: `Error Getting Business Proposals: ${
            error?.response?.data?.message ||
            error?.message ||
            'Something went wrong'
          }`,
        });
      });
  };
};

// GET CLIENT PROPOSALS
export const onGetClientProposals = (clientId) => {
  const { messages } = appIntl();
  return (dispatch) => {
    dispatch({ type: FETCH_START, message: 'Fetching proposals...' });
    jwtAxios
      .get(`business/proposal/get-client-proposals/${clientId}`)
      .then((data) => {
        if (data.status === 200) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: GET_CLIENT_PROPOSALS, payload: data.data });
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: messages['message.somethingWentWrong'],
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: FETCH_ERROR,
          payload: error.response.data.message || error.message,
        });
      });
  };
};

// GET SINGLE PROPOSAL
export const getSingleProposal = (id, token) => {
  const { messages } = appIntl();
  return async (dispatch) => {
    dispatch({ type: FETCH_START });
    try {
      const response = await jwtAxios.get(
        `business/proposal/${id}?token=${token}`,
        {
          params: {
            id,
          },
        },
      );
      if (response.status === 200) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({
          type: GET_SINGLE_PROPOSAL,
          payload: response.data.data,
        });
        return response.data.data;
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: messages['message.somethingWentWrong'],
        });
        throw new Error(messages['message.somethingWentWrong']);
      }
    } catch (error) {
      console.error('Error fetching proposal: ', error);
      if (error.response.status === 403) {
        return error;
      }
      dispatch({
        type: FETCH_ERROR,
        payload: `Error Fetching Proposal ${
          error?.response?.data?.message ||
          error?.message ||
          'Something went wrong'
        }`,
      });
    }
  };
};

// EDIT PROPOSAL: creates new draft version
export const onEditProposal = (proposal) => {
  const { messages } = appIntl();
  return (dispatch) => {
    jwtAxios
      .patch(`business/proposal/update-version/${proposal._id}`, {
        content: proposal.version.content,
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({ type: FETCH_SUCCESS, message: 'Proposal draft saved' });
          dispatch({
            type: EDIT_PROPOSAL,
            payload: data.data.data,
          });
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: messages['message.somethingWentWrong'],
          });
        }
        return data.data.data;
      })
      .catch((error) => {
        dispatch({
          type: FETCH_ERROR,
          payload: `Error Editing Proposal: ${error.message}`,
        });
      });
  };
};

export const onEditPartialProposal = (proposal) => {
  const { messages } = appIntl();
  return async (dispatch) => {
    dispatch({ type: FETCH_START });
    try {
      const response = await jwtAxios.patch(
        `business/proposal/update/${proposal._id}`,
        proposal,
      );

      if (response.status === 200) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({
          type: EDIT_PARTIAL_PROPOSAL,
          payload: response.data.proposal,
        });
        return response.data.proposal;
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
      throw `Error Editing Proposal: ${
        error?.response?.data?.message ||
        error?.message ||
        'Something went wrong'
      }`;
    }
  };
};

// DELETE PROPOSAL
export const onDeleteProposal = (id) => {
  const { messages } = appIntl();
  return (dispatch) => {
    jwtAxios
      .delete(`business/proposal/${id}`)
      .then((data) => {
        if (data.status === 200) {
          dispatch({ type: FETCH_SUCCESS, message: 'Deleting proposals...' });
          dispatch({
            type: DELETE_PROPOSAL,
            payload: id,
          });

          return data;
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: messages['message.somethingWentWrong'],
          });
        }
        return data;
      })
      .catch((error) => {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};

export const onEditProposalRevision = ({ proposalInfo, content, creator }) => {
  const { messages } = appIntl();
  return async (dispatch) => {
    dispatch({ type: FETCH_START });
    try {
      const response = await jwtAxios.patch(
        `business/proposal/update-version/${proposalInfo._id}`,
        { proposalInfo, content, creator },
      );

      if (response.status === 200) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({
          type: EDIT_PROPOSAL_REVISION,
          payload: response.data.data,
        });
        return response.data.data;
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: messages['message.somethingWentWrong'],
        });
        throw new Error(messages['message.somethingWentWrong']);
      }
    } catch (error) {
      console.error('Error during proposal revision edit:', error);
      dispatch({
        type: FETCH_ERROR,
        payload: `Error Editing Proposal Revision: ${
          error?.response?.data?.message ||
          error?.message ||
          'Something went wrong'
        }`,
      });
      throw `Error Editing Proposal Revision: ${
        error?.response?.data?.message ||
        error?.message ||
        'Something went wrong'
      }`;
    }
  };
};

// EDIT PROPOSAL CURRENT VERSION: edits the latest version of the proposal as well as rest of proposal(i.e. status)
export const onEditProposalCurrentVersion = ({
  proposalInfo,
  content,
  creator,
}) => {
  const { messages } = appIntl();
  return async (dispatch) => {
    try {
      const response = await jwtAxios.patch(
        `business/proposal/update-version2/${proposalInfo._id}`,
        { proposalInfo, content, creator },
      );

      if (response.status === 200) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({
          type: EDIT_PROPOSAL_CURRENT_VERSION,
          payload: response.data.data,
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
      console.error(error);
      throw `Error  Editing Proposal: ${
        error?.response?.data?.message ||
        error?.message ||
        'Something went wrong'
      }`;
    }
  };
};

//AUTOSAVE... similar to onEditProposalCurrentVersion but createAsyncThunk to avoid infinite loop when autosave keeps getting called
export const onAutoSave = createAsyncThunk(
  'proposal/autoSave',
  async ({ proposalInfo, content, creator }, { dispatch, getState }) => {
    try {
      const { messages } = appIntl();

      const response = await jwtAxios.patch(
        `business/proposal/update-version2/${proposalInfo._id}`,
        {
          proposalInfo,
          content,
          creator,
        },
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
      console.log('Error in AutoSave', error);
    }
  },
);

// UPDATE PARAGRAPH: update specific paragraph using AI
export const onUpdateParagraph = ({ paragraph, conditions }) => {
  const { messages } = appIntl();
  return (dispatch) => {
    dispatch({ type: FETCH_UPDATE_AI_START });
    jwtAxios
      .post(`business/proposal/update-para`, {
        para: paragraph,
        prompt: conditions,
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({ type: FETCH_SUCCESS, message: 'Text Updated' });
          dispatch({
            type: UPDATE_TEXT,
            payload: data.data.data,
          });
          return data;
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: messages['message.somethingWentWrong'],
          });
        }
        return data;
      })
      .catch((error) => {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};

// GET USER PROPOSALS
export const onGetUserProposals = (id) => {
  const { messages } = appIntl();

  return async (dispatch) => {
    // USES UNIQUE FETCH STARt to include uniqule load when fetching client
    // to not interfere with regual loading and to add loading to contacts input
    dispatch({ type: FETCH_START, message: 'Fetching proposals...' });
    try {
      const response = await jwtAxios.get(
        `/business/proposal/get-user-proposals/${id}`,
      );

      if (response.status === 200) {
        //  STOP CONTACTS LOADING
        dispatch({ type: FETCH_SUCCESS });
        dispatch({
          type: GET_USER_PROPOSALS,
          payload: response.data.proposals,
        });
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: messages['message.somethingWentWrong'],
        });
      }
    } catch (error) {
      dispatch({
        type: FETCH_ERROR,
        payload: `Error Getting User Proposals: ${
          error?.response?.data?.message ||
          error?.message ||
          'Something went wrong'
        }`,
      });
    }
  };
};

// ADD PROPOSAL
export const onAddProposal = (proposal) => {
  const { messages } = appIntl();
  return (dispatch) => {
    return jwtAxios
      .put(`/users/add-proposal`, { proposal })
      .then((data) => {
        if (data.status === 201) {
          dispatch({ type: ADD_PROPOSAL, payload: data.data.proposal });
        } else {
          console.error('Error adding proposal');
        }
      })
      .catch((error) => {
        console.error('Error adding proposal', error);
        throw `Error Adding Proposal to User: ${
          error?.response?.data?.message ||
          error?.message ||
          'Something went wrong'
        }`;
      });
  };
};

// ADD BUSINESS COLLABORATOR
export const onAddBusinessCollaborator = ({ pid, user }) => {
  const { messages } = appIntl();

  return (dispatch) => {
    return jwtAxios
      .patch(`/business/proposal/add-business-collaborator/${pid}`, { user })
      .then((data) => {
        if (data.status === 201) {
          dispatch({
            type: FETCH_SUCCESS,
            message: 'User Added as Collaborator',
          });
        } else {
          console.error('Error adding business collaborator');
        }
      })
      .catch((error) => {
        console.error('Error adding business collaborator', error);
        throw `Error Adding Business Collaborator: ${
          error?.response?.data?.message ||
          error?.message ||
          'Something went wrong'
        }`;
      });
  };
};

// ADD BUSINESS APPROVER
export const onAddBusinessApprover = ({ pid, user }) => {
  const { messages } = appIntl();

  return (dispatch) => {
    return jwtAxios
      .patch(`/business/proposal/add-business-approver/${pid}`, { user })
      .then((data) => {
        if (data.status === 201) {
          dispatch({ type: FETCH_SUCCESS, message: 'User Added as Approver' });
        } else {
          console.error('Error adding business Approver');
        }
      })
      .catch((error) => {
        console.error('Error adding business Approver', error);

        throw `Error Adding Business Approver: ${
          error?.response?.data?.message ||
          error?.message ||
          'Something went wrong'
        }`;
      });
  };
};

// ADD  CLEITN COLLABORATOR
export const onAddClientCollaborator = ({ pid, user }) => {
  const { messages } = appIntl();

  return (dispatch) => {
    return jwtAxios
      .patch(`/business/proposal/add-client-collaborator/${pid}`, { user })
      .then((data) => {
        if (data.status === 201) {
          dispatch({
            type: FETCH_SUCCESS,
            message: 'User Added as Collaborator',
          });
        } else {
          console.error('Error adding Client Collaborator');
        }
      })
      .catch((error) => {
        console.error('Error adding Client collaborator', error);
        throw `Error Adding client Collaborator: ${
          error?.response?.data?.message ||
          error?.message ||
          'Something went wrong'
        }`;
      });
  };
};

// ADD CLIENT APPROVER
export const onAddClientApprover = ({ pid, user }) => {
  const { messages } = appIntl();
  return (dispatch) => {
    return jwtAxios
      .patch(`/business/proposal/add-client-approver/${pid}`, { user })
      .then((data) => {
        if (data.status === 201) {
          dispatch({ type: FETCH_SUCCESS, message: 'User Added as Approver' });
        } else {
          console.error('Error adding Client Approver');
        }
      })
      .catch((error) => {
        console.error('Error adding Client Approver', error);

        throw `Error Adding Client Approver: ${
          error?.response?.data?.message ||
          error?.message ||
          'Something went wrong'
        }`;
      });
  };
};

// DELETE BUSINESS COLLABORATOR
export const onDeleteBusinessCollaborator = ({ pid, user }) => {
  const { messages } = appIntl();

  return (dispatch) => {
    return jwtAxios
      .patch(`/business/proposal/delete-business-collaborator/${pid}`, { user })
      .then((data) => {
        if (data.status === 200) {
          dispatch({ type: FETCH_SUCCESS, message: data.message });
        } else {
          console.error('Error Deleting business collaborator');
        }
      })
      .catch((error) => {
        console.error('Error Deleting business collaborator', error);
        throw `Error Deleting Business Collaborator: ${
          error?.response?.data?.message ||
          error?.message ||
          'Something went wrong'
        }`;
      });
  };
};


// DELETE BUSINESS APPROVER
export const onDeleteBusinessApprover = ({ pid, user }) => {
  const { messages } = appIntl();

  return (dispatch) => {
    return jwtAxios
      .patch(`/business/proposal/delete-business-approver/${pid}`, { user })
      .then((data) => {
        if (data.status === 200) {
          dispatch({ type: FETCH_SUCCESS, message: data.message });
        } else {
          console.error('Error Deleting business Approver');
        }
      })
      .catch((error) => {
        console.error('Error Deleting business Approver', error);

        throw `Error Deleting Business Approver: ${
          error?.response?.data?.message ||
          error?.message ||
          'Something went wrong'
        }`;
      });
  };
};

// DELETE CLIENT COLLABORATOR
export const onDeleteClientCollaborator = ({ pid, user }) => {
  const { messages } = appIntl();
  return (dispatch) => {
    return jwtAxios
      .patch(`/business/proposal/delete-client-collaborator/${pid}`, { user })
      .then((data) => {
        if (data.status === 200) {
          dispatch({ type: FETCH_SUCCESS, message: data.message });
        } else {
          console.error('Error deleting client collaborator');
        }
      })
      .catch((error) => {
        dispatch({
          type: FETCH_ERROR,
          payload: `Error Editing Proposal Revision: ${
            error?.response?.data?.message ||
            error?.message ||
            'Something went wrong'
          }`,
        });
        console.error('Error deleting client collaborator', error);
        throw `Error deleting client Collaborator: ${
          error?.response?.data?.message ||
          error?.message ||
          'Something went wrong'
        }`;
      });
  };
};

// DELETE CLIENBT APPROVER
export const onDeleteClientApprover = ({ pid, user }) => {
  const { messages } = appIntl();
  return (dispatch) => {
    return jwtAxios
      .patch(`/business/proposal/delete-client-approver/${pid}`, { user })
      .then((data) => {
        if (data.status === 200) {
          dispatch({ type: FETCH_SUCCESS, message: data.message });
        } else {
          console.error('Error deleting client Approver');
        }
      })
      .catch((error) => {
        console.error('Error deleting client Approver', error);
        throw `Error Deleting Client Approver: ${
          error?.response?.data?.message ||
          error?.message ||
          'Something went wrong'
        }`;
      });
  };
};


