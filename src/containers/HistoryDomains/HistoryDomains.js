import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  loadHistory,
  removeHistory,
  sortBy,
  setFilteredHistoryDomains,
  resetFilter,
} from '../../store/actions/historyDomains';

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
  };

  state = {
    showModal: false,
  };

  componentDidMount() {
    if (this.props.historyDomains.length === 0) {
      this.props.loadHistory();
    }
  }

  goBack = () => {
    this.props.history.push('/');
  };

  // TODO: check if maybe it best to move this to the reducer
  filterDomains = value => {
    // 1. if the value is "empty" use the inputSearchData from state, happens in the sortBt function
    const searchValue = value || this.props.inputSearchData;
    // 2. check if domains are sorted and search have value, if so use the filtered domains, if not it means that it filtered from the sort button and we need to filter it from all the domains
    let domains = this.props.historyDomains;
    if (this.props.sorted && value) {
      domains = this.props.filteredDomains;
    }
    return domains.filter(domain => domain.name.includes(searchValue));
  };

  searchDomainsHandler = event => {
    const { value } = event.target;

    if (value.trim() === '') {
      this.props.setFilteredHistoryDomains(this.props.historyDomains, null);
    } else {
      const updatedDomains = this.filterDomains(value);
      this.props.setFilteredHistoryDomains(updatedDomains, value);
    }
  };

  sortBy = type => {
    // get the correct domains filtered/all of them.
    const allDomains = this.props.inputSearchData
      ? [...this.filterDomains()]
      : [...this.props.historyDomains];

    this.props.sortBy(type, allDomains);
  };

  resetStateHistory = () => {
    this.props.removeHistory();
    this.setState({
      showModal: false,
    });
  };

  clearHistory = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    let domainList = <p>No history saved...</p>;

    if (this.props.historyDomains.length > 0) {
      domainList = <DomainCheck listDomains={this.props.filteredDomains} />;
    }

    // TODO: break this to separate components
    // TODO: show which sort type is selected
    // TODO: disable the other sort types (not ALL) if there are no history domains
    // TODO: change sort success to sort available
    return (
      <>
        <div className={classes.BackButton}>
          <Button clicked={this.goBack}>Back Home</Button>
        </div>
        <div className={classes.Filters}>
          <Button name="reset-filter" onClick={this.props.resetFilter}>
            Rest Filter
          </Button>
          <input
            type="search"
            name="domains-filter"
            id="domains-filter"
            onChange={this.searchDomainsHandler}
            placeholder="Search Domains..."
            value={this.props.inputSearchData}
          />
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
            disabled={this.props.historyDomains.length === 0}
            clicked={this.clearHistory}
          >
            Clear History
          </Button>
          <Modal show={this.state.showModal} closed={this.closeModal}>
            <Confirmation
              clickedOK={this.resetStateHistory}
              clickedCancel={this.closeModal}
              additionalText="Please note that this action can't be undone! It will DELETE the all history."
            />
          </Modal>
          <ButtonCopy
            disabled={this.props.historyDomains.length === 0}
            copyText={this.props.filteredDomains
              .map(domain => domain.name)
              .join('\n')}
          >
            Copy Domains
          </ButtonCopy>
        </div>
        <div className={classes.List}>{domainList}</div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  historyDomains: state.historyDomains.historyDomains,
  filteredDomains: state.historyDomains.filteredDomains,
  sorted: state.historyDomains.sorted,
  inputSearchData: state.historyDomains.inputSearchData,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadHistory,
      sortBy,
      setFilteredHistoryDomains,
      removeHistory,
      resetFilter,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryDomains);

export { HistoryDomains };
