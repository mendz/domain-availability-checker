import { useState, useReducer, useEffect } from 'react';

import domainReducer,
{ FILTER_SHOW_ALL, FILTER_SHOW_SUCCESS, FILTER_SHOW_FAIL, FILTER_SEARCH, DOMAIN_SET } from './domainReducer';

const useHistoryFilter = () => {
   const [filteredDomains, dispatch] = useReducer(domainReducer, { historyDomains: [], filteredDomains: [], sorted: false });
   const [inputSearchData, setInputSearchData] = useState(null);

   useEffect(() => {
      loadHistory();
   }, []);

   const loadHistory = () => {
      const historyString = localStorage.getItem('historyDomains');

      if (historyString) {
         const history = JSON.parse(historyString);
         dispatch({ type: DOMAIN_SET, domains: history });
      }
   }

   // filter the domains by value
   const filterDomains = value => {
      // // 1. if the value is "empty" use the inputSearchData from state, happens in the sortBt function
      const searchValue = value || inputSearchData;
      // // 2. check if domains are sorted and search have value, if so use the filtered domains, if not it means that it filtered from the sort button and we need to filter it from all the domains
      // let domains = [...filteredDomains.historyDomains];
      // if (filteredDomains.sorted && value) {
      //    domains = [...filteredDomains];
      // }
      // dispatch({ type: DOMAIN_SET, domains });
      dispatch({ type: FILTER_SEARCH, searchValue });
   }

   const searchDomains = event => {
      const { value } = event.target;

      if (value.trim() === '') {
         dispatch({ type: DOMAIN_SET, domains: filteredDomains.historyDomains });
         setInputSearchData(null);
      } else {
         filterDomains(value);
         setInputSearchData(value);
      }
   }

   // const sortBy = type => {
   //    // get the correct domains filtered/all of them.
   //    const allDomains = inputSearchData ? [...filteredDomains] : [...historyDomains];

   //    switch (type) {
   //       case 'all':
   //          setFilteredDomains(allDomains);
   //          break;
   //       case 'success':
   //          setFilteredDomains(allDomains.filter(domain => domain.availability));
   //          setSorted(true);
   //          break;
   //       case 'fail':
   //          setFilteredDomains(allDomains.filter(domain => !domain.availability));
   //          setSorted(true);
   //          break;
   //       default:
   //          setFilteredDomains(allDomains);
   //          break;
   //    }
   // }

   return {
      filteredDomains,
      searchDomainsHandler: searchDomains
   }
};

export default useHistoryFilter;