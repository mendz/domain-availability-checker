import React, { Component } from 'react';
import isFQDN from 'validator/lib/isFQDN';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  setDecodedDomains,
  clearDecodedDomains,
} from '../../store/actions/domainList';

import { saveToHistory } from '../../store/actions/historyDomains';

import DomainCheck from '../../components/DomainCheck/DomainCheck';
import Button from '../../components/UI/Button/Button';
import Textarea from '../../components/UI/Textarea/Textarea';
import Header from '../../components/UI/Header/Header';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import ButtonInfo from '../../components/UniqueButtons/ButtonInfo/ButtonInfo';
import Info from '../../components/Info/Info';

import axios from '../../axios/axios-domains';
import { stripDomainFromURL } from '../../utils/normalizeDomain';

import classes from './DomainList.module.css';
import Modal from '../../components/UI/Modal/Modal';

class DomainList extends Component {
  state = {
    domainsList: [],
    validation: {
      required: true,
      isUrl: true,
      errorMessage: 'Please enter a at least one domain.',
    },
    invalidDomains: [],
    formIsValid: false,
    showInfo: false,
  };

  checkValidity = (value, rules) => {
    let isValid = true;

    // in case the input doesn't have any rules
    if (!rules) return true;

    if (rules.required) {
      isValid = value.length !== 0 && isValid;
    }

    if (rules.isUrl) {
      const invalidDomains = value.filter(domain => !isFQDN(domain));
      // .map(domain => domain);

      // if at least one domain is valid we can proceed and check this one,
      // if all the domain is not valid all the form will be not valid
      const atLeastOneValid = value.length > invalidDomains.length;
      isValid = atLeastOneValid && isValid;

      // if at least one domain changed we will update the state
      if (invalidDomains.length > 0) {
        this.setState({ invalidDomains });
      }
    }

    return isValid;
  };

  domainListHandle = e => {
    if (e.target.value === '') {
      this.setState({ domainsList: [] });
      return;
    }

    const domains = e.target.value
      .split('\n')
      .map(domain =>
        /^http.*/.test(domain) ? stripDomainFromURL(domain) : domain
      );

    const updatedObj = {
      domainsList: domains,
      formIsValid: this.checkValidity(domains, this.state.validation),
    };

    this.setState(prevState => ({
      ...prevState,
      ...updatedObj,
    }));
  };

  checkDomains = async e => {
    e.preventDefault();

    await this.props.setDecodedDomains(
      this.state.domainsList,
      this.state.invalidDomains
    );
    this.props.saveToHistory(this.props.decodedDomainList);
  };

  clearDomains = () => {
    this.setState({
      domainsList: [],
      formIsValid: false,
    });
    this.props.clearDecodedDomains();
  };

  goToHistory = () => {
    this.props.history.push('/history');
  };

  showInfoModal = () => {
    this.setState({ showInfo: true });
  };

  closeInfoModal = () => {
    this.setState({ showInfo: false });
  };

  render() {
    const domains = this.state.domainsList.map(domain => domain).join('\n');

    let domainCheck = null;
    if (this.props.decodedDomainList.length > 0) {
      domainCheck = <DomainCheck listDomains={this.props.decodedDomainList} />;
    }
    return (
      <>
        <div className={classes.HistoryButton}>
          <Button
            clicked={this.goToHistory}
            name="go-to-history"
            disabled={this.props.checking}
          >
            History
          </Button>
          <ButtonInfo clicked={this.showInfoModal} />
          <Modal show={this.state.showInfo} closed={this.closeInfoModal}>
            <Info />
          </Modal>
        </div>
        <div className={classes.DomainList}>
          <Header />
          <form onSubmit={this.checkDomains}>
            <Textarea
              change={this.domainListHandle}
              value={domains}
              readOnly={this.props.checking}
              placeholder="List of domain names to check"
            />
            <div className={classes.Buttons}>
              <Button bigger clicked={this.clearDomains} type="reset">
                Clear
              </Button>
              <Button
                bigger
                type="submit"
                disabled={!this.state.formIsValid || this.props.checking}
              >
                Check
              </Button>
            </div>
          </form>
          {domainCheck}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  decodedDomainList: state.domainList.decodedDomainList,
  checking: state.domainList.checking,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { setDecodedDomains, clearDecodedDomains, saveToHistory },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(DomainList, axios));

// for testing without the HOC
export { DomainList };
