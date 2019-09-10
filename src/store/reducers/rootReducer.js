import { combineReducers } from 'redux';

import domainList from './domainList';
import historyDomains from './historyDomains';

const rootReducer = combineReducers({
  domainList,
  historyDomains,
});

export default rootReducer;
