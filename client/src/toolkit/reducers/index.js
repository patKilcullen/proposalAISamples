import { combineReducers } from 'redux';
import Business from './Business'
import Proposals from './Proposals'
import Common from './Common';
import Users from './Users';
import Contacts from './Contacts'

const reducers = () =>
  combineReducers({
    business: Business,
    proposals: Proposals,
    common: Common,
    users: Users,
    contacts: Contacts
 
  });
export default reducers;
