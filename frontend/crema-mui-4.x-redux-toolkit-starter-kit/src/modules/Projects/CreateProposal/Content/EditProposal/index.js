import React, { useMemo } from 'react';
import AppAnimate from '@crema/components/AppAnimate';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { isEmptyObject } from '@crema/helpers/ApiHelper';

import CreateProposal from '../../../CreateProposal';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleProposal,} from '../../../../../toolkit/actions';
import { removeProposal } from '../../../../../toolkit/reducers/Proposals';
import AppInfoView from '@crema/components/AppInfoView';

// This componented is tied to the edit-proposal route in core/approutes
// it runs the createProposalComponent but it includes a slectedBlog, which
// directs it to EditProposalTemplate

const EditProposal = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const selectedProposal = useSelector(({ proposals }) => proposals.proposal);
  const navigate = useNavigate()


  
  useEffect(() => {
    dispatch(getSingleProposal(id)).then((res)=>{
        if(res?.response?.status === 403){
          navigate('/error-pages/error-403')
        }
      });
  }, [dispatch, id]);

  // CLEANUP ON UNMOUNT - remove proposal from store to
  // avoid errors when switching between proposal in all proposals
  useEffect(() => {
    return () => {
      dispatch(removeProposal());
    };
  }, []);

  return !isEmptyObject(selectedProposal) ? (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
      {/* return createProposal.. with a selected blog, it wil route to edit proposal template */}
      <CreateProposal proposal={selectedProposal ? selectedProposal : null} />
    </AppAnimate>
  ) : (
    // if isEmptyObject, include AppInfoView to dispaly error to user(in such cases as cant get proposal)
    <AppInfoView />
  );
};
export default EditProposal;
