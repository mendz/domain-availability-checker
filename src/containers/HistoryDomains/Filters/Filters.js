import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  resetFilter,
  setFilterType,
  setSearchValue,
} from '../../../store/actions/historyDomains';

import Button from '../../../components/UI/Button/Button';
import SymbolsCheck from '../../../components/UI/SymbolsCheck/SymbolsCheck';

import classes from './Filters.module.css';

const Filters = ({
  searchValue,
  filterType,
  resetFilter,
  setFilterType,
  setSearchValue,
}) => {
  const handleFilter = event => {
    const { target } = event;
    setFilterType(target.dataset.filterType);
  };

  const handleSearchInput = event => {
    const { target } = event;
    setSearchValue(target.value);
  };

  const handleResetFilter = () => {
    resetFilter();
  };

  return (
    <div className={classes.Filters}>
      <Button name="reset-filter" onClick={handleResetFilter}>
        Rest Filter
      </Button>
      <input
        className={classes.SearchInput}
        type="search"
        name="domains-filter"
        id="domains-filter"
        onChange={handleSearchInput}
        placeholder="Search Domains..."
        value={searchValue}
      />
      <label>Filter by: </label>
      <Button
        onClick={handleFilter}
        name="show-all"
        data-filter-type="all"
        active={filterType === 'all' ? true : false}
      >
        All
      </Button>
      <Button
        onClick={handleFilter}
        name="show-available"
        data-filter-type="available"
        active={filterType === 'available' ? true : false}
      >
        <SymbolsCheck type="available" />
      </Button>
      <Button
        onClick={handleFilter}
        name="show-unavailable"
        data-filter-type="unavailable"
        active={filterType === 'unavailable' ? true : false}
      >
        <SymbolsCheck type="unavailable" />
      </Button>
    </div>
  );
};

const mapStateToProps = state => ({
  filterType: state.historyDomains.filterType,
  searchValue: state.historyDomains.searchValue,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ resetFilter, setFilterType, setSearchValue }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filters);

export { Filters };
