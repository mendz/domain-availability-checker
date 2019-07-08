import React, { Component } from 'react';
import isFQDN from 'validator/lib/isFQDN';

import DomainCheck from '../../components/DomainCheck/DomainCheck';
import Button from '../../components/UI/Button/Button';
import Textarea from '../../components/UI/Textarea/Textarea';
import Header from '../../components/UI/Header/Header';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import ButtonInfo from '../../components/UniqueButtons/ButtonInfo/ButtonInfo';
import Info from '../../components/Info/Info';

import axios from '../../axios/axios-domains';
import { stripDomainFromURL, getDomainFromRequest } from '../../utils/normalizeDomain';

import classes from './DomainList.module.css';
import Modal from '../../components/UI/Modal/Modal';
import { throwError } from '../../utils/setupErrorsTrack';

class DomainList extends Component {
   state = {
      domainsList: [],
      decodedDomainList: [],
      validation: {
         required: true,
         isUrl: true,
         errorMessage: 'Please enter a at least one domain.'
      },
      invalidDomains: [],
      formIsValid: false,
      checking: false,
      showInfo: false
   }
   checkValidity = (value, rules) => {
      let isValid = true;

      // in case the input doesn't have any rules
      if (!rules) return true;

      if (rules.required) {
         isValid = value.length !== 0 && isValid;
      }

      if (rules.isUrl) {
         const invalidDomains = value
            .filter(domain => !isFQDN(domain));
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
   }

   domainListHandle = (e) => {
      if (e.target.value === '') {
         this.setState({ domainsList: [] });
         return;
      }

      const domains = e.target.value
         .split('\n')
         .map(domain => {
            return /^http.*/.test(domain) ? stripDomainFromURL(domain) : domain;
         });

      const updatedObj = {
         domainsList: domains,
         formIsValid: this.checkValidity(domains, this.state.validation)
      }

      this.setState(prevState => ({
         ...prevState,
         ...updatedObj
      }));
   }

   checkDomains = async e => {
      e.preventDefault();
      this.setState({ checking: true });

      // update the state with raw information - invalid / loading
      const decodedDomainListRaw = [...new Set(this.state.domainsList)]
         .filter(domain => domain.trim() !== '')
         .map(domain => {
            const isInvalid = this.state.invalidDomains.find(invalidDomain => invalidDomain === domain);
            if (!isInvalid) {
               return {
                  name: domain,
                  availability: null,
                  networkError: false,
                  invalid: false
               }
            } else {
               return {
                  name: domain,
                  availability: false,
                  networkError: false,
                  invalid: true
               }
            }
         });

      this.setState({ decodedDomainList: decodedDomainListRaw });

      // start checking the domain and update the state per domain
      const finishCheckingPromises = decodedDomainListRaw
         .filter(domain => !domain.invalid)
         .map(async domain => {
            const response = await this.checkAvailable(domain.name);
            let resultDomain = {};

            // no response due to error, no need to continue check this domain
            if (!response) {
               resultDomain = {
                  ...domain,
                  name: domain.name,
                  networkError: true,
               };
               this.updateDomainInDecodedDomainList(domain.name, resultDomain);
               throwError('No response data', resultDomain);
               return null;
            }

            const { data, statusText, config } = response;

            if (data && statusText === 'OK') {
               resultDomain = {
                  ...domain,
                  name: data.domain,
                  availability: data.isAvailable,
               }
            } else if (!statusText === 'OK') {
               resultDomain = {
                  ...domain,
                  name: getDomainFromRequest(config.url),
                  networkError: true,
               }
            }

            this.updateDomainInDecodedDomainList(domain.name, resultDomain);
         });

      // wait for all the checking to finish in order to reopen the textarea
      await Promise.all(finishCheckingPromises);
      this.setState({ checking: false });
      this.saveToHistory();
   }

   checkAvailable = async (domainName) => {
      const response = await axios(`available/${domainName}`)
         .catch(err => console.error(`ERROR!!!\n${err}`));
      return response;
   }

   updateDomainInDecodedDomainList = (domainName, resultDomain) => {
      const updatedDecodedDomainList = [...this.state.decodedDomainList];
      const index = updatedDecodedDomainList.findIndex(domainToFind => domainToFind.name === domainName);
      updatedDecodedDomainList[index] = resultDomain;

      this.setState({ decodedDomainList: updatedDecodedDomainList });
   }

   clearDomains = () => {
      this.setState({
         domainsList: [],
         decodedDomainList: [],
         formIsValid: false,
      });
   }

   saveToHistory = () => {
      const oldHistoryString = localStorage.getItem('historyDomains');
      let currentHistory = '';

      // if there already history it will filter from it the domains that are in the current check
      // and concat the old history
      if (oldHistoryString) {
         const oldHistory = JSON.parse(oldHistoryString);
         const filteredOld = oldHistory
            .filter(currentHistory =>
               !this.state.decodedDomainList.find(domain => domain.name === currentHistory.name));
         const combineHistory = this.state.decodedDomainList.concat(filteredOld);
         currentHistory = JSON.stringify(combineHistory);
      } else {
         currentHistory = JSON.stringify(this.state.decodedDomainList);
      }

      localStorage.setItem('historyDomains', currentHistory);
   }

   goToHistory = () => {
      this.props.history.push('/history');
   }

   showInfoModal = () => {
      this.setState({ showInfo: true });
   }

   closeInfoModal = () => {
      this.setState({ showInfo: false });
   }

   render() {
      const domains = this.state.domainsList.map(domain => domain).join('\n');

      let domainCheck = null;
      if (this.state.decodedDomainList.length > 0) {
         domainCheck = <DomainCheck listDomains={this.state.decodedDomainList} />;
      }
      return (
         <>
            <div className={classes.HistoryButton}>
               <Button
                  clicked={this.goToHistory}
                  name="go-to-history"
                  disabled={this.state.checking}
               >History</Button>
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
                     readOnly={this.state.checking}
                     placeholder='List of domain names to check' />
                  <div className={classes.Buttons}>
                     <Button
                        bigger
                        clicked={this.clearDomains}
                        type="reset">Clear</Button>
                     <Button
                        bigger
                        type="submit"
                        disabled={!this.state.formIsValid || this.state.checking}>Check</Button>
                  </div>
               </form>
               {domainCheck}
            </div>
         </>
      );
   }
}

export default withErrorHandler(DomainList, axios);

// for testing without the HOC
export {
   DomainList
}