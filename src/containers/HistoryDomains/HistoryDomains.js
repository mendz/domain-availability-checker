import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';

import DomainCheck from '../../components/DomainCheck/DomainCheck';
import Button from '../../components/UI/Button/Button';
import SymbolsCheck from '../../components/UI/SymbolsCheck/SymbolsCheck';
import Modal from '../../components/UI/Modal/Modal';
import Confirmation from '../../components/Confirmation/Confirmation';
import ButtonCopy from '../../components/UniqueButtons/ButtonCopy/ButtonCopy';

import classes from './HistoryDomain.module.css';

const HistoryDomains = ({ history }) => {
   const [historyDomains, setHistoryDomains] = useState([]);
   const [filteredDomains, setFilteredDomains] = useState([]);
   const [inputSearchData, setInputSearchData] = useState(null);
   const [showModal, setShowModal] = useState(false);
   const [sorted, setSorted] = useState(false);

   useEffect(() => {
      loadHistory();
   }, []);

   const loadHistory = () => {
      const historyString = localStorage.getItem('historyDomains');

      if (historyString) {
         const history = JSON.parse(historyString);
         setHistoryDomains(history);
         setFilteredDomains(history);
      }
   }

   const goBack = () => {
      history.push('/');
   }

   const filterDomains = value => {
      // 1. if the value is "empty" use the inputSearchData from state, happens in the sortBt function
      const searchValue = value || inputSearchData;
      // 2. check if domains are sorted and search have value, if so use the filtered domains, if not it means that it filtered from the sort button and we need to filter it from all the domains
      let domains = [...historyDomains];
      if (sorted && value) {
         domains = [...filteredDomains];
      }
      return domains.filter(domain => domain.name.includes(searchValue));
   }

   const searchDomainsHandler = event => {
      const { value } = event.target;

      if (value.trim() === '') {
         setFilteredDomains(historyDomains);
         setInputSearchData(null);
      } else {
         const updatedDomains = filterDomains(value);
         setFilteredDomains(updatedDomains);
         setInputSearchData(value);
      }
   }

   // TODO: Maybe change filteredDomains from useState to useReducer
   const sortBy = type => {
      // get the correct domains filtered/all of them.
      const allDomains = inputSearchData ? [...filterDomains()] : [...historyDomains];

      switch (type) {
         case 'all':
            setFilteredDomains(allDomains);
            break;
         case 'success':
            setFilteredDomains(allDomains.filter(domain => domain.availability));
            setSorted(true);
            break;
         case 'fail':
            setFilteredDomains(allDomains.filter(domain => !domain.availability));
            setSorted(true);
            break;
         default:
            setFilteredDomains(allDomains);
            break;
      }
   }

   const resetStateHistory = () => {
      localStorage.removeItem('historyDomains');
      setHistoryDomains([]);
      setFilteredDomains([]);
      setInputSearchData(null);
      setShowModal(false);
      setSorted(false);
   }

   const clearHistory = () => {
      setShowModal(true);
   }

   const closeModal = () => {
      setShowModal(false);
   }

   let domainList = <p>No history saved...</p>;

   if (historyDomains.length > 0) {
      domainList = <DomainCheck listDomains={filteredDomains} />
   }

   return (
      <>
         <div className={classes.BackButton}>
            <Button clicked={goBack}>Back Home</Button>
         </div>
         <div className={classes.Filters}>
            <input
               type="search"
               name="domains-filter"
               id="domains-filter"
               onChange={searchDomainsHandler}
               placeholder="Search Domains..." />
            <label>Sort by: </label>
            <Button clicked={() => sortBy('all')} name="show-all">
               All
               </Button>
            <Button clicked={() => sortBy('success')} name="show-success">
               <SymbolsCheck type="success" />
            </Button>
            <Button clicked={() => sortBy('fail')} name="show-fail">
               <SymbolsCheck type="fail" />
            </Button>
            <Button
               name="clear-history"
               disabled={historyDomains.length === 0}
               clicked={clearHistory}>Clear History</Button>
            <Modal show={showModal} closed={closeModal}>
               <Confirmation clickedOK={resetStateHistory} clickedCancel={closeModal} />
            </Modal>
            <ButtonCopy
               disabled={historyDomains.length === 0}
               copyText={filteredDomains.map(domain => domain.name).join('\n')}
            >Copy Domains</ButtonCopy>
         </div>
         <div className={classes.List}>
            {domainList}
         </div>
      </>
   )
}

HistoryDomains.propTypes = {
   history: PropTypes.object
}

export default HistoryDomains
