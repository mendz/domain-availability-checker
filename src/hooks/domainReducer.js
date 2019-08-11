export const DOMAIN_SET = 'DOMAIN_SET';
export const FILTER_SHOW_ALL = 'FILTER_SHOW_ALL';
export const FILTER_SHOW_SUCCESS = 'FILTER_SHOW_SUCCESS';
export const FILTER_SHOW_FAIL = 'FILTER_SHOW_FAIL';
export const FILTER_SEARCH = 'FILTER_SEARCH';

const filterByValue = (domains, value) => {
   return domains.filter(domain => domain.name.includes(value));
}

const domainReducer = (state, action) => {
   switch (action.type) {
      case DOMAIN_SET:
         return {
            ...state,
            historyDomains: [...action.domains],
            filteredDomains: [...action.domains],
         };
      case FILTER_SHOW_ALL:
         return {
            ...state,
            filteredDomains: filterByValue(state.historyDomains, action.inputSearchData),
         };
      case FILTER_SHOW_SUCCESS:
         state.filter(domain => domain.availability);
         return {
            ...state,
            sorted: true
         }
      case FILTER_SHOW_FAIL:
         return state.filter(domain => !domain.availability);
      case FILTER_SEARCH:
         return {
            ...state,
            filteredDomains: state.filteredDomains.filter(domain => domain.name.includes(action.searchValue))
         }
      default:
         return state;
   }
};

export default domainReducer;