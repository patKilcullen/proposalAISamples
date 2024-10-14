import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ProjectListHeader from './ProjectListHeader';
import AppsHeader from '@crema/components/AppsContainer/AppsHeader';
import AppsContent from '@crema/components/AppsContainer/AppsContent';
import { useSelector } from 'react-redux';
import AppCard from '@crema/components/AppCard';
import { useAuthUser } from '@crema/hooks/AuthHooks';
import {
  fetchError,
  onDeleteProposal,
  onGetBusinessProposals,
  onGetUserProposals,
} from '../../../toolkit/actions';
import AppLoader from '@crema/components/AppLoader';
import AppConfirmDialog from '@crema/components/AppConfirmDialog';
import ProposalTable from './allProposalsTable';
import AppInfoView from '@crema/components/AppInfoView';
import PleaseCreateBusiness from 'modules/errorPages/PleaseCreateBusinessModal';

import { getRoles } from 'utils/roleUtils';
import { roleStatusDisplay } from 'utils/roleStatusDisplay';
const AllProposals = ({ activeProjects, completedProjects }) => {
  const dispatch = useDispatch();
  const { user } = useAuthUser();

  const { message } = useSelector(({ common }) => common);
  const loading = useSelector(({ common }) => common.loading);
  const proposals = useSelector(({ proposals }) => proposals.proposals);

  // GET ALL BUSINESS PROPOSALS on dispatch and when businessID changes
  useEffect(() => {
    if (user?._id) {
      dispatch(onGetUserProposals(user._id));
    }
  }, [dispatch, user?._id]);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState('');

  // DELETE PROPOSAL, first setConfirm deletes to display confirmation box and set ID of proposal to be delted
  const handleDeleteProposal = (id) => {
    setConfirmDelete(true);
    setDeleteId(id);
  };

  //DELETE PROPOSAL AFTER CONFIRMATION... hit delste proposal in toolkit using set proposal ID,
  //  set confirmation box to false and propo ID to null
  const handleDeleteProposalAfterConfirm = async (id) => {
    await dispatch(onDeleteProposal(deleteId));
    setConfirmDelete(false);
    setDeleteId('');
  };

  // ALIGNMENT, set the toggle bar for proposal status and hable changes
  // if completedProjects is true, set to signed
  // if event, handling in-review dropdown, if setAlignmnet, handling main toggle menu
  const [alignment, setAlignment] = useState(
    completedProjects ? 'signed' : 'all',
  );
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment ? newAlignment : event);
    filterProposals(newAlignment ? newAlignment : event);
  };

  // FILTER TEXT
  const [filterText, setFilterText] = useState('');

  //FILTERED PROPOSALS: when proposals change setFilteredProposals(for first render)
  // then sets alignment and filtere proposals for actions like delete
  const [filteredProposals, setFilteredProposals] = useState([]);
  useEffect(() => {
    setFilteredProposals(proposals);
    setAlignment(alignment);
    filterProposals(alignment);
  }, [proposals]);

  // SET FILTER PROPOSAL depending on the filterType of the alignment toggle bar
  const filterProposals = (filterType) => {
    if (filterType === 'all') {
      if (activeProjects) {
        setFilteredProposals(
          proposals.filter(
            (proposal) =>
              proposal.status !== 'signed' && proposal.status !== 'rejected',
          ),
        );
      } else {
        setFilteredProposals(proposals);
      }
    }
    if (filterType === 'draft') {
      setFilteredProposals(
        proposals.filter((proposal) => proposal.status === 'draft'),
      );
    }

    // If business in proposal,,, sent mean sent or in-revision
    // it client in proposal... sent mean returned or retuned-revision
    if (filterType === 'sent') {
      setFilteredProposals(
        proposals.filter((proposal) => {
          let role = getRoles(proposal, user);
          if (role.roleType === 'business') {
            return (
              proposal.status === 'sent' || proposal.status === 'in-revision'
            );
          }
          if (role.roleType === 'client') {
            return (
              proposal.status === 'returned' ||
              proposal.status === 'returned-revision'
            );
          }
        }),
      );
    }
    if (filterType === 'signed') {
      setFilteredProposals(
        proposals.filter(
          (proposal) =>
            proposal.status === 'signed' || proposal.status === 'clientSigned',
        ),
      );
    }

    if (filterType === 'in-review') {
      setFilteredProposals(
        proposals.filter((proposal) => {
          let role = getRoles(proposal, user);
          if (role.roleType === 'business') {
            return (
              proposal.status === 'returned' ||
              proposal.status === 'returned-revision'
            );
          }
          if (role.roleType === 'client') {
            return (
              proposal.status === 'sent' || proposal.status === 'in-revision'
            );
          }
        }),
      );
    }
  };

  // SEARCH PROPOSAL TEXT: search bar the look for text in proposals
  useEffect(() => {
    const searchText = filterText.toLowerCase();
    // Reset filteredProposals (to account for when text is deleted)
    // if is "all" and not in activeProjects, make it the whole proposal list, is all and not active projects, filter out signed and rejected
    // if in-review, filter of both returned and returned revision
    let currentProposals = proposals.filter((proposal) =>
      alignment === 'in-review'
        ? proposal.status === 'returned' ||
          proposal.status === 'returned-revision'
        : alignment === 'all' && activeProjects
        ? proposal.status !== 'signed' || proposal.status === 'rejected'
        : proposal.status === alignment,
    );
    setFilteredProposals(
      alignment === 'all' && !activeProjects ? proposals : currentProposals,
    );

    // Filter the already filtered proposal to look for matching text in certains values
    setFilteredProposals((filteredProposals) =>
      filteredProposals.filter(
        (proposal) =>
        proposal.title?.toLowerCase().includes(searchText) ||
          proposal.status.toLowerCase().includes(searchText) ||
          proposal.clientName?.toLowerCase().includes(searchText) ||
          proposal.clientId?.userName.toLowerCase().includes(searchText) ||
          proposal.metadata?.services?.toLowerCase().includes(searchText) ||
          proposal.version[proposal?.version?.length - 1]?.content
            ?.toLowerCase()
            .includes(searchText),
      ),
    );
  }, [filterText]);

  // REVERSE THE PROPOSAL BY DATE
  const handleReverseDate = (newest) => {
    let tempProps = [...filteredProposals];
    if (newest) {
      tempProps.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
    } else {
      tempProps.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    }
    setFilteredProposals(tempProps);
  };

  //   // REVERSE THE PROPOSAL BY DATE
  const handleReverseOrder = (type, orderType) => {
    let tempProps = [...filteredProposals];
    if (type === 'client') {
      if (orderType.client) {
        tempProps.sort((a, b) => {
          if (a.clientId === undefined && b.clientId === undefined) {
            return 0; // Both are undefined, considered equal
          }
          // Check if clientId is undefined for a
          if (a.clientId === undefined) {
            return 1; // a is undefined, place it after b
          }
          // Check if clientId is undefined for b
          if (b.clientId === undefined) {
            return -1; // b is undefined, place it after a
          }
          //

          return a.clientId.userName.localeCompare(b.clientId.userName);
        });
      } else {
        tempProps.sort((a, b) => {
          if (a.clientId === undefined && b.clientId === undefined) {
            return 0; // Both are undefined, considered equal
          }
          // Check if clientId is undefined for a
          if (a.clientId === undefined) {
            return 1; // a is undefined, place it after b
          }
          // Check if clientId is undefined for b
          if (b.clientId === undefined) {
            return -1; // b is undefined, place it after a
          }
          //
          return b.clientId.userName.localeCompare(a.clientId.userName);
        });
      }
    }

  if (type === 'title') {
      if (orderType.title) {
        tempProps.sort((a, b) => {
          if (a.title === undefined && b.title === undefined) {
            return 0; // Both are undefined, considered equal
          }
          // Check if title is undefined for a
          if (a.title === undefined) {
            return 1; // a is undefined, place it after b
          }
          // Check if title is undefined for b
          if (b.title === undefined) {
            return -1; // b is undefined, place it after a
          }
          //

          return a.title.localeCompare(b.title);
        });
      } else {
        tempProps.sort((a, b) => {
          if (a.title === undefined && b.title === undefined) {
            return 0; // Both are undefined, considered equal
          }
          // Check if title is undefined for a
          if (a.title === undefined) {
            return 1; // a is undefined, place it after b
          }
          // Check if title is undefined for b
          if (b.title === undefined) {
            return -1; // b is undefined, place it after a
          }
          //
          return b.title.localeCompare(a.title);
        });
      }
    }

    if (type === 'business') {
      if (orderType.business) {
        tempProps.sort((a, b) =>
          a.businessId.businessName.localeCompare(b.businessId.businessName),
        );
      } else {
        tempProps.sort((a, b) =>
          b.businessId.businessName.localeCompare(a.businessId.businessName),
        );
      }
    }
    if (type === 'role') {
      if (orderType.role) {
        tempProps.sort((a, b) => {
          let roleA = getRoles(a, user);
          let roleB = getRoles(b, user);
          return roleA.displayRole.localeCompare(roleB.displayRole);
        });
      } else {
        tempProps.sort((a, b) => {
          let roleA = getRoles(a, user);
          let roleB = getRoles(b, user);
          return roleB.displayRole.localeCompare(roleA.displayRole);
        });
      }
    }
    if (type === 'status') {
      if (orderType.status) {
        tempProps.sort((a, b) => {
          let roleAA = getRoles(a, user);
          let roleBB = getRoles(b, user);
          let roleA = roleStatusDisplay(a, roleAA);
          let roleB = roleStatusDisplay(b, roleBB);
          return roleA.localeCompare(roleB);
        });
      } else {
        tempProps.sort((a, b) => {
          let roleAA = getRoles(a, user);
          let roleBB = getRoles(b, user);
          let roleA = roleStatusDisplay(a, roleAA);
          let roleB = roleStatusDisplay(b, roleBB);
          return roleB.localeCompare(roleA);
        });
      }
    }

    setFilteredProposals(tempProps);
  };

  return loading ? (
    <AppLoader message={message} />
  ) : // Pop up window to confirm proposal deletion
  confirmDelete ? (
    <AppConfirmDialog
      open={true}
      onDeny={setConfirmDelete}
      onConfirm={handleDeleteProposalAfterConfirm}
      title={'Are you sure you want to delete that proposal?'}
      dialogTitle
    />
  ) : (
    <AppCard>
      {/* HEADER */}
      <AppsHeader>
        <ProjectListHeader
          proposalList={proposals || []}
          filterProposals={filterProposals}
          filterText={filterText}
          setFilterText={setFilterText}
          handleChange={handleChange}
          alignment={alignment}
          activeProjects={activeProjects}
          completedProjects={completedProjects}
          // inReviewToggle={inReviewToggle}
        />
      </AppsHeader>

      <AppsContent>
        {/* TABLE */}
        <ProposalTable
          proposalData={filteredProposals}
          loading={loading}
          handleDeleteProposal={handleDeleteProposal}
          handleReverseDate={handleReverseDate}
          handleReverseOrder={handleReverseOrder}
        />
      </AppsContent>
      <AppInfoView />
    </AppCard>
  );
};

export default AllProposals;
