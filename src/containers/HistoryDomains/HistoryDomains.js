import React, { Component } from 'react'

import DomainCheck from '../../components/DomainCheck/DomainCheck';
import Button from '../../components/UI/Button/Button';
import SymbolsCheck from '../../components/UI/SymbolsCheck/SymbolsCheck';

import classes from './HistoryDomain.module.css';

class HistoryDomains extends Component {
   state = {
      historyDomains: [],
      filteredDomains: [],
      inputSearchData: null
   }

   componentDidMount() {
      this.loadHistory();
   }

   loadHistory = () => {
      const historyString = localStorage.getItem('history');

      if (historyString) {
         const history = JSON.parse(historyString);
         this.setState({ historyDomains: history, filteredDomains: history });
      }
   }

   goBack = () => {
      this.props.history.push('/');
   }


   filterDomains = value => {
      const searchValue = value || this.state.inputSearchData;
      return this.state.historyDomains.filter(domain => domain.name.includes(searchValue));
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
      const allDomains = this.state.inputSearchData ? [...this.filterDomains()] : [...this.state.historyDomains];

      switch (type) {
         case 'all':
            this.setState({ filteredDomains: allDomains });
            break;
         case 'success':
            this.setState({ filteredDomains: allDomains.filter(domain => domain.availability) });
            break;
         case 'fail':
            this.setState({ filteredDomains: allDomains.filter(domain => !domain.availability) });
            break;

         default:
            this.setState({ filteredDomains: allDomains });
            break;
      }

   }

   resetStateHistory = () => {
      this.setState({
         historyDomains: [],
         filteredDomains: [],
         inputSearchData: null,
      })
   }

   clearHistory = () => {
      localStorage.removeItem('history');
      this.resetStateHistory();
   }

   render() {
      let domainList = <p>No history saved...</p>;

      if (this.state.historyDomains.length > 0) {
         domainList = <DomainCheck listDomains={this.state.filteredDomains} />
      }

      return (
         <div className={classes.History}>
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
               <Button clicked={() => this.sortBy('all')}>
                  All
               </Button>
               <Button clicked={() => this.sortBy('success')}>
                  <SymbolsCheck type="success" />
               </Button>
               <Button clicked={() => this.sortBy('fail')}>
                  <SymbolsCheck type="fail" />
               </Button>
               <Button
                  disabled={this.state.historyDomains.length === 0}
                  clicked={this.clearHistory}>Clear History</Button>
            </div>
            <div className={classes.List}>
               {domainList}
            </div>
         </div>
      )
   }
}

export default HistoryDomains
