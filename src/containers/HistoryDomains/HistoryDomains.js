import React, { Component } from 'react'
import PropTypes from 'prop-types';

import DomainCheck from '../../components/DomainCheck/DomainCheck';
import Button from '../../components/UI/Button/Button';
import SymbolsCheck from '../../components/UI/SymbolsCheck/SymbolsCheck';
import Modal from '../../components/UI/Modal/Modal';
import Confirmation from '../../components/Confirmation/Confirmation';
import ButtonCopy from '../../components/UniqueButtons/ButtonCopy/ButtonCopy';

import classes from './HistoryDomain.module.css';

class HistoryDomains extends Component {
   static propTypes = {
      history: PropTypes.object,
   }

   state = {
      historyDomains: [],
      filteredDomains: [],
      inputSearchData: null,
      showModal: false,
      sorted: false,
   }

   componentDidMount() {
      this.loadHistory();
   }

   loadHistory = () => {
      const historyString = localStorage.getItem('historyDomains');

      if (historyString) {
         const history = JSON.parse(historyString);
         this.setState({ historyDomains: history, filteredDomains: history });
      }
   }

   goBack = () => {
      this.props.history.push('/');
   }


   filterDomains = value => {
      // 1. if the value is "empty" use the inputSearchData from state, happens in the sortBt function
      const searchValue = value || this.state.inputSearchData;
      // 2. check if domains are sorted and search have value, if so use the filtered domains, if not it means that it filtered from the sort button and we need to filter it from all the domains
      let domains = this.state.historyDomains;
      if (this.state.sorted && value) {
         domains = this.state.filteredDomains;
      }
      return domains.filter(domain => domain.name.includes(searchValue));
   }

   searchDomainsHandler = event => {
      const { value } = event.target;

      if (value.trim() === '') {
         this.setState({ filteredDomains: this.state.historyDomains, inputSearchData: null });
      } else {
         const updatedDomains = this.filterDomains(value);
         this.setState({ filteredDomains: updatedDomains, inputSearchData: value });
      }
   }

   sortBy = type => {
      // get the correct domains filtered/all of them.
      const allDomains = this.state.inputSearchData ? [...this.filterDomains()] : [...this.state.historyDomains];

      switch (type) {
         case 'all':
            this.setState({ filteredDomains: allDomains });
            break;
         case 'success':
            this.setState({ filteredDomains: allDomains.filter(domain => domain.availability), sorted: true });
            break;
         case 'fail':
            this.setState({ filteredDomains: allDomains.filter(domain => !domain.availability), sorted: true });
            break;

         default:
            this.setState({ filteredDomains: allDomains });
            break;
      }

   }

   resetStateHistory = () => {
      localStorage.removeItem('historyDomains');
      this.setState({
         historyDomains: [],
         filteredDomains: [],
         inputSearchData: null,
         showModal: false,
         sorted: false,
      });
   }

   clearHistory = () => {
      this.setState({ showModal: true });
   }

   closeModal = () => {
      this.setState({ showModal: false });
   }

   render() {
      let domainList = <p>No history saved...</p>;

      if (this.state.historyDomains.length > 0) {
         domainList = <DomainCheck listDomains={this.state.filteredDomains} />
      }

      return (
         <>
            <div className={classes.BackButton}>
               <Button clicked={this.goBack}>Back Home</Button>
            </div>
            <div className={classes.Filters}>
               <input
                  type="search"
                  name="domains-filter"
                  id="domains-filter"
                  onChange={this.searchDomainsHandler}
                  placeholder="Search Domains..." />
               <label>Sort by: </label>
               <Button clicked={() => this.sortBy('all')} name="show-all">
                  All
               </Button>
               <Button clicked={() => this.sortBy('success')} name="show-success">
                  <SymbolsCheck type="success" />
               </Button>
               <Button clicked={() => this.sortBy('fail')} name="show-fail">
                  <SymbolsCheck type="fail" />
               </Button>
               <Button
                  name="clear-history"
                  disabled={this.state.historyDomains.length === 0}
                  clicked={this.clearHistory}>Clear History</Button>
               <Modal show={this.state.showModal} closed={this.closeModal}>
                  <Confirmation clickedOK={this.resetStateHistory} clickedCancel={this.closeModal} />
               </Modal>
               <ButtonCopy
                  disabled={this.state.historyDomains.length === 0}
                  copyText={this.state.filteredDomains.map(domain => domain.name).join('\n')}
               >Copy Domains</ButtonCopy>
            </div>
            <div className={classes.List}>
               {domainList}
            </div>
         </>
      )
   }
}

export default HistoryDomains
