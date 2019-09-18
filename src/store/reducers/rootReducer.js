import { combineReducers } from 'redux';

import domainList from './domainList';
import historyDomains from './historyDomains';
import auth from './auth';

const rootReducer = combineReducers({
  domainList,
  historyDomains,
  auth,
});

export default rootReducer;
