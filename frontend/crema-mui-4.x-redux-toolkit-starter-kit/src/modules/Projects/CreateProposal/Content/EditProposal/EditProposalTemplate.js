import React, {useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppCard from '@crema/components/AppCard';
import { Box, Button } from '@mui/material';
import AppLoader from '@crema/components/AppLoader';
import { useAuthUser } from '@crema/hooks/AuthHooks';
import SendProposalContact from './SendProposalContact';
import UpdateTextMenu from './UpdateTextMenu';
import { useAutosave } from 'react-autosave';
import { onAutoSave, onEditPartialProposal } from '../../../../../toolkit/actions';
import { autoSaveError } from 'toolkit/reducers/Proposals';
import AppInfoView from '@crema/components/AppInfoView';
import { getRoles } from '../../../../../utils/roleUtils';
import { selectProposalVersions } from '../../../../../utils/proposalVersions';
import AppsContainer from '@crema/components/AppsContainer';
import EditProposalSideMenu from './EditProposalSideMenu';

import Editor from '../../../../Components/Editor';
import ProposalTitle from 'modules/Components/ProposalTitle';

import DOMPurify from 'dompurify';

const EditProposalTemplate = ({
  proposal,
  setProposalVersion,
  sendToClient,
  handleSendProposalRevision,
  handleSendUpdateCurrentVersion,
  setSendToClient,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // check if proposal has data for the first time the proposal is loaded
  const { status, version } = proposal.data ? proposal.data : proposal;
  const { user } = useAuthUser();

  const { loading } = useSelector(({ common }) => common);
  const hasAutoSaveError = useSelector(autoSaveError);

  const [role, setRole] = useState('');
  const [displayRole, setDisplayRole] = useState('');
  const [roleType, setRoleType] = useState(''); //determines whether buisnes or client

  const memoizedRole = useMemo(
    () => getRoles(proposal, user),
    [proposal, user],
  );

  useEffect(() => {
    setRole(memoizedRole.role);
    setDisplayRole(memoizedRole.displayRole);
    setRoleType(memoizedRole.roleType);
  }, [memoizedRole]);

  // POPOSAL VERSIONS: all versions, using useMemo to avoid rerendering.  Depending on whether client or business
  // and the status of proposal, show all or all but last versions.  If other party(client or biz) is editing, then do not show last version
  const [proposalVersions, setProposalVersions] = useState([]);
  useEffect(() => {
    const proposalVersionsFiltered = selectProposalVersions(
      version,
      proposal,
      roleType,
    );
    setProposalVersions(proposalVersionsFiltered);
  }, [version, proposal.status]);

  // SET selected proposal versiona and number to the last proposal in array
  const [selectedVersionNum, setSelectedVersionNum] = useState(
    proposalVersions.length - 1,
  );

  // SELECT PROPOSAL VERSION to display
  const handleSelectVersion = (version) => {
    setSelectedVersionNum(version);
    setProposalVersion(proposalVersions[version]?.content);
  };

  // When proposalVersion or number changes, if exists, update the corresponding edit content to displau
  useEffect(() => {
    if (proposalVersions.length > 0) {
      setEditorContent(proposalVersions[selectedVersionNum]?.content);
    }
  }, [selectedVersionNum, proposalVersions]);

  // EDITOR CONTENT: text displayed in the editor.  when changes, update proposalversion
  const [editorContent, setEditorContent] = useState(
    proposalVersions[selectedVersionNum]?.content,
  );

  const handleEditorChange = (value) => {
    setEditorContent(value);
    setProposalVersion(value);
  };

  // If proposalVersions changes, update version number and editor content
  useEffect(() => {
    if (proposalVersions.length > 0) {
      setSelectedVersionNum(proposalVersions.length - 1);
      setEditorContent(proposalVersions[proposalVersions.length - 1]?.content);
    }
  }, [proposalVersions]);

  // Replaces the selected part of the proposal with the reposne from AI.  Does not save to DB
  const [textToReplace, setTextToReplace] = useState('');
  const handleReplaceText = (text) => {

   let sanitizedText = DOMPurify.sanitize(text)

    setEditorContent(editorContent.replace(textToReplace, sanitizedText));
  };

  // SEND PROPOSAL POP UP
  const [showContacts, setShowContacts] = useState(false);
  const handleSendToClient = () => {
    setShowContacts(true);
  };

  // ALLOW AUTOSAVE .. sets to true after editorContent first loads to avoid triggering autosave on mount
  const [allowAutoSave, setAllowAutosave] = useState(false);

  // SAVE for AUTOSAVE: IF USER IS EDITING (dependent on role and status of propsal), allow to save
  // otherwise dont allow because will cause issues
  const save = () => {
 
    if (
      editorContent &&
      (((role === 'businessAdmin' || role === 'businessCollaborator') &&
        status === 'returned-revision') ||
        ((role === 'clientAdmin' || role === 'clientCollaborator') &&
          status === 'in-revision')) &&
      selectedVersionNum === proposalVersions.length - 1
    ) {
      if (allowAutoSave) {
        dispatch(
          onAutoSave({
            proposalInfo: {
              pid: proposal._id,
              uid: user._id,
              _id: proposal._id,
              creator: user,
            },
            content: editorContent,
            versionNum: selectedVersionNum,
          }),
        );
      }
      setAllowAutosave(true);
    }
  };

  // AUTOSAVE: saves editor content after it changes
  useAutosave({ data: editorContent, onSave: save });

  const editorRef = useRef(null);
  const handlAddFocus = () =>{
    editorRef.current.focus();
  }
  return loading ? (
    <AppLoader />
  ) : // depending on on who(user or client) is on page and what the current proposal status is, stay on page or navigate to sent -proposal
  ((role === 'businessAdmin' ||
      role === 'businessCollaborator' ||
      role === 'businessApprover') &&
      (status === 'sent' || status === 'in-revision')) ||
    ((role === 'clientAdmin' ||
      role === 'clientCollaborator' ||
      role === 'clientApprover') &&
      (status === 'returned' ||
        status === 'returned-revision' ||
        status === 'sent')) ? (
    navigate(`/sent-project/${proposal._id}`)
  ) : (
    <AppsContainer
      rowReverse={true}
      sidebarContent={
        <EditProposalSideMenu
          proposal={proposal}
          role={role}
          handleSendProposalRevision={handleSendProposalRevision}
          handleSendToClient={handleSendToClient}
          handleSendUpdateCurrentVersion={handleSendUpdateCurrentVersion}
          selectedVersionNum={selectedVersionNum}
          proposalVersions={proposalVersions}
          handleSelectVersion={handleSelectVersion}
          status={status}
          displayRole={displayRole}
          hasAutoSaveError={hasAutoSaveError}
          allowAutoSave={allowAutoSave}
          roleType={roleType}
        />
      }
    >
      {/* Update w/AI button when select text*/}
      <UpdateTextMenu
        handleReplaceText={handleReplaceText}
        textToReplace={textToReplace}
        setTextToReplace={setTextToReplace}
        editorContent={editorContent}
      />
      {/* TITLE */}

      {proposalVersions?.map((proposalVersion, index) => (
        <AppCard
          key={index}
          style={{
            display: index === selectedVersionNum ? 'block' : 'none',
            overflow: 'auto',
          }}
        >
          <Box sx={{display: "flex", justifyContent: "space-between"}}>
{proposal.title && <ProposalTitle title={proposal.title} id={proposal._id} role={role} />}
{/* <Button onClick={handlAddFocus}>
      <CropFreeIcon />
    
      </Button> */}
      </Box>
          <Box ref={editorRef} sx={{ display: 'flex', justifyContent: 'space-between' }}></Box>
          {/* EDITOR */}
          <Box
            sx={{
              width: '100%',
              my: 2,
            }}
             
          >
            <Editor
           
               content={editorContent}
              onChange={handleEditorChange}
              readOnly={
                (proposal.status !== 'draft' &&
                  selectedVersionNum < proposalVersions.length - 1) ||
                proposal.status === 'returned' ||
                role === 'clientApprover' ||
                role === 'businessApprover'
                  ? true
                  : false
              }
            />
          </Box>
        </AppCard>
      ))}

      {/* CLIENT INFO MODAL(Pop up window) */}
      {
        <SendProposalContact
          sendToClient={sendToClient}
          showContacts={showContacts}
          setShowContacts={setShowContacts}
          proposal={proposal}
          setSendToClient={setSendToClient}
        />
      }
      <AppInfoView />
      
    </AppsContainer>
  );
};
export default EditProposalTemplate;
