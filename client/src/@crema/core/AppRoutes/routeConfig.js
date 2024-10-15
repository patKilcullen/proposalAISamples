import React from 'react';
import {
  RiTodoLine,
} from 'react-icons/ri';
import { ImFeed} from 'react-icons/im';
import {
  BsBriefcase,
} from 'react-icons/bs';
import {
  MdOutlineContactSupport,
  MdOutlineManageAccounts,
  MdDashboardCustomize,
} from 'react-icons/md';
import { FiUsers } from 'react-icons/fi';

import { RoutePermittedRole } from '@crema/constants/AppEnums';


const routesConfig = [

  {
    id: 'dashboard',
    title: 'Dashboard',
    messageId: 'Dashboard',
    type: 'item',
    icon: <MdDashboardCustomize />,
    permittedRole: [RoutePermittedRole.Admin],
    url: '/dashboard',
  },

  {
    id: 'projects',
    title: 'Projects',
    messageId: 'Proposals',
    type: 'collapse',
    icon: <BsBriefcase />,
    children: [
      {
        id: 'Create Project',
        title: 'Create Project',
        messageId: 'Create New',
        type: 'item',
        // Buiness Colaborator but NOT end user
        
        permittedRole: [ RoutePermittedRole.Admin, RoutePermittedRole.Client],
        url: '/create-project',
      },
      {
        id: 'All Projects',
        title: 'All Projects',
        messageId: 'All Proposals',
        type: 'item',
         permittedRole: [ RoutePermittedRole.Admin, RoutePermittedRole.Client],
        url: '/projects',
      },
      {
        id: 'Active Projects',
        title: 'Active Projects',
        messageId: 'Active Proposals',
        type: 'item',
        permittedRole: [ RoutePermittedRole.Admin, RoutePermittedRole.Client],
        url: '/active-projects',
      },
      {
        id: 'Completed Projects',
        title: 'Completed Projects',
        messageId: 'Completed Proposals',
        type: 'item',
        permittedRole: [ RoutePermittedRole.Admin,RoutePermittedRole.Client],
        url: '/completed-projects',
      },
    ],
  },
  // {
  //   id: 'content-collaboration',
  //   title: 'Content Collaboration',
  //   messageId: 'Content Collaboration',
  //   type: 'collapse',
  //   permittedRole: [RoutePermittedRole.Client],
  //   icon: <FiUsers />,
  //   children: [
  //     {
  //       id: 'Collaborative Projects',
  //       title: 'Collaborative Projects',
  //       messageId: 'Collaborative Projects',
  //       type: 'item',
  //       url: '/collaborative-projects',
  //     },
  //     {
  //       id: 'Content Approval',
  //       title: 'Content Approval',
  //       messageId: 'Content Approval',
  //       type: 'item',
  //       url: '/completed-projects',
  //     },
  //   ],
  // },
  // {
  //   id: 'task-management',
  //   title: 'Task Management',
  //   messageId: 'Task Management',
  //   type: 'collapse',
  //   icon: <RiTodoLine />,
  //   // icon: 'rss_feed',
  //   children: [
  //     {
  //       id: 'Create & Assign Tasks',
  //       title: 'Create & Assign Tasks',
  //       messageId: 'Create & Assign Tasks',
  //       type: 'item',
  //       url: '/create-assign-tasks',
  //     },
  //     {
  //       id: 'Assigned Tasks',
  //       title: 'Create & Assign Tasks',
  //       messageId: 'Create & Assign Tasks',
  //       type: 'item',
        
  //       url: '/create-assign-tasks',
  //     },
  //     {
  //       id: 'Task Calender',
  //       title: 'Task Calender',
  //       messageId: 'Task Calender',
  //       type: 'item',
  //       url: '/task-calender',
  //     },
  //     {
  //       id: 'Task Status Tracking',
  //       title: 'Task Status Tracking',
  //       messageId: 'Task Status Tracking',
  //       type: 'item',
  //       url: '/task-status-tracking',
  //     },
  //   ],
  // },
  // {
  //   id: 'notifications',
  //   title: 'Notifications',
  //   messageId: 'Notifications',
  //   type: 'collapse',
  //   icon: <ImFeed />,
    
  //   children: [
  //     {
  //       id: 'General Notifications',
  //       title: 'General Notifications',
  //       messageId: 'General Notifications',
  //       type: 'item',

        
  //       url: '/notifications/general',
  //     },
  //     {
  //       id: 'Project Updates',
  //       title: 'Project Updates',
  //       messageId: 'Project Updates',
  //       type: 'item',
        
  //       url: '/notifications/project-updates',
  //     },
  //   ],
  // },
  {
    id: 'account-settings',
    title: 'Account Settings',
    messageId: 'Account Settings',
    type: 'collapse',
    icon: <MdOutlineManageAccounts />,
    children: [
      {
        id: 'Profile Information',
        title: 'Profile Information',
        messageId: 'Profile Information',
        type: 'item',
        
        url: '/my-profile',
      },
      // {
      //   id: 'Notification Preferences',
      //   title: 'Notification Preferences',
      //   messageId: 'Notification Preferences',
      //   type: 'item',
        
      //   url: '/notification-preferences',
      // },
    ],
  },
  {
    id: 'support',
    title: 'Support',
    messageId: 'Support',
    type: 'collapse',
    icon: <MdOutlineContactSupport />,
    children: [
      // {
      //   id: 'Help Center',
      //   title: 'Help Center',
      //   messageId: 'Help Center',
      //   type: 'item',
        
      //   url: '/help-center',
      // },
      {
        id: 'Contact Support',
        title: 'Contact Support',
        messageId: 'Contact Support',
        type: 'item',
        
        url: '/contact-support',
      },
    ],
  },

  {
    id: 'business',
    title: 'Business',
    messageId: 'Business',
    type: 'collapse',
    icon: <MdOutlineManageAccounts />,
    permittedRole: [RoutePermittedRole.Admin],
    children: [
      {
        id: 'Onboarding',
        title: 'Onboarding',
        messageId: 'Onboarding',
        type: 'item',
        permittedRole: [RoutePermittedRole.Admin],
        url: '/business-onboarding',
      },
      {
        id: 'Information',
        title: 'Information',
        messageId: 'Information',
        type: 'item',
        permittedRole: [RoutePermittedRole.Admin],
        url: '/business-information',
      },
    ],
  },
  {
    id: 'team-management',
    title: 'Team Management',
    messageId: 'Team Management',
    type: 'collapse',
    permittedRole: [RoutePermittedRole.Admin],
    icon: <FiUsers />,
    children: [
      {
        id: 'all-team-members',
        title: 'All Team Members',
        messageId: 'All Team Members',
        type: 'item',
        permittedRole: [RoutePermittedRole.Admin],
        url: '/team-members',
      },
      {
        id: 'add-team-members',
        title: 'Add Team Members',
        messageId: 'Add Team Members',
        type: 'item',
        permittedRole: [RoutePermittedRole.Admin],
        url: '/add-team-members',
      },
      // {
      //   id: 'roles-and-persmissions',
      //   title: 'Roles and Permissions',
      //   messageId: 'Roles and Permissions',
      //   type: 'item',
      //   permittedRole: [RoutePermittedRole.Admin],
      //   url: '/roles-permissions',
      // },
      // {
      //   id: 'Project Feedback',
      //   title: 'Project Feedback',
      //   messageId: 'Project Feedback',
      //   type: 'item',
      //   permittedRole: [RoutePermittedRole.Admin],
      //   url: '/completed-projects',
      // },
    ],
  },
  // {
  //   id: 'templates',
  //   title: 'Templates',
  //   messageId: 'Templates',
  //   type: 'collapse',
  //   // permittedRole: [RoutePermittedRole.Admin],
  //   icon: <FiUsers />,
  //   children: [
  //     {
  //       id: 'personalized-templates',
  //       title: 'Personalized Templates',
  //       messageId: 'Personalized Templates',
  //       type: 'item',
  //       permittedRole: [RoutePermittedRole.Admin],
  //       url: '/templates',
  //     },
  //     {
  //       id: 'doc-preferences',
  //       title: 'Document Preferences',
  //       messageId: 'Document Preferences',
  //       type: 'item',
  //       permittedRole: [RoutePermittedRole.Admin],
  //       url: '/doc-preferences',
  //     },
  //   ],
  // },

];
export default routesConfig;
