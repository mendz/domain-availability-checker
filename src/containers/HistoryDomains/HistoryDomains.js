import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  loadHistory,
  removeHistory,
  resetFilter,
  setSearchValue,
  setFilterType,
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
    filteredDomains: [],
  };

  componentDidMount() {
    // if there is no history domains try to load them
    if (this.props.historyDomains.length === 0) {
      this.props.loadHistory();
    } else {
      // if there is history domains, filter them to there initial value
      this.setFilteredDomains();
    }
  }

  componentDidUpdate(prevProps) {
    // for the time that the history domains loaded when componentDidMount
    if (!prevProps.historyDomains.length && this.props.historyDomains.length) {
      this.setFilteredDomains();

      // for when the filter type or the search value changed and re-render the components
    } else if (
      prevProps.searchValue !== this.props.searchValue ||
      prevProps.filterType !== this.props.filterType
    ) {
      this.setFilteredDomains();
    }
  }

  goBack = () => {
    this.props.history.push('/');
  };

  resetStateHistory = () => {
    this.props.removeHistory();
    this.setState({
      showModal: false,
      filteredDomains: [],
    });
  };

  clearHistory = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  handleFilter = event => {
    const { target } = event;
    this.props.setFilterType(target.dataset.filterType);
  };

  handleSearchInput = event => {
    const { target } = event;
    this.props.setSearchValue(target.value);
  };

  handleResetFilter = () => {
    this.props.resetFilter();
    this.setState({ filteredDomains: this.props.historyDomains });
  };

  setFilteredDomains = () => {
    const { historyDomains, searchValue, filterType } = this.props;
    let filtered = [...historyDomains];
    if (filterType === 'available') {
      filtered = historyDomains.filter(domain => domain.availability);
    } else if (filterType === 'unavailable') {
      filtered = historyDomains.filter(domain => !domain.availability);
    }

    let filteredDomains = filtered;
    if (searchValue.trim() !== '') {
      filteredDomains = filtered.filter(domain =>
        domain.name.includes(searchValue)
      );
    }

    this.setState({ filteredDomains });
  };

  render() {
    let domainList = <p>No history saved...</p>;

    if (this.props.historyDomains.length > 0) {
      domainList = <DomainCheck listDomains={this.state.filteredDomains} />;
    }

    // TODO: break this to separate components
    return (
      <>
        <div className={classes.BackButton}>
          <Button clicked={this.goBack}>Back Home</Button>
        </div>
        <div className={classes.Filters}>
          <Button name="reset-filter" clicked={this.handleResetFilter}>
            Rest Filter
          </Button>
          <input
            type="search"
            name="domains-filter"
            id="domains-filter"
            onChange={this.handleSearchInput}
            placeholder="Search Domains..."
            value={this.props.searchValue}
          />
          <label>Filter by: </label>
          <Button
            clicked={this.handleFilter}
            name="show-all"
            data-filter-type="all"
            active={this.props.filterType === 'all' ? true : false}
          >
            All
          </Button>
          <Button
            clicked={this.handleFilter}
            name="show-available"
            data-filter-type="available"
            active={this.props.filterType === 'available' ? true : false}
          >
            <SymbolsCheck type="available" />
          </Button>
          <Button
            clicked={this.handleFilter}
            name="show-unavailable"
            data-filter-type="unavailable"
            active={this.props.filterType === 'unavailable' ? true : false}
          >
            <SymbolsCheck type="unavailable" />
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
            copyText={this.state.filteredDomains
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
  filterType: state.historyDomains.filterType,
  searchValue: state.historyDomains.searchValue,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadHistory,
      removeHistory,
      resetFilter,
      setSearchValue,
      setFilterType,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryDomains);

export { HistoryDomains };
