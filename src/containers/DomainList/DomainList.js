import React, { Component } from 'react';
import isFQDN from 'validator/lib/isFQDN';

import DomainCheck from '../../components/DomainCheck/DomainCheck';
import Button from '../../components/UI/Button/Button';
import Textarea from '../../components/UI/Textarea/Textarea';

import axios from '../../axios/axios-domains';
import { stripUrl, getDomainFromRequest } from '../../utils/normalizeDomain';

import classes from './DomainList.module.css';

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
      checking: false
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
         .map(domain => stripUrl(domain));

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
      const decodedDomainListRaw = this.state.domainsList
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
            const { data, statusText, config } = await axios(`available/${domain.name}`);
            let resultDomain = {};

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
            const updatedDecodedDomainList = [...this.state.decodedDomainList];
            const index = updatedDecodedDomainList.findIndex(domainToFind => domainToFind.name === domain.name);
            updatedDecodedDomainList[index] = resultDomain;

            this.setState({ decodedDomainList: updatedDecodedDomainList });
         });

      // wait for all the checking to finish in order to reopen the textarea
      await Promise.all(finishCheckingPromises);
      this.setState({ checking: false });
   }

   clearDomains = () => {
      this.setState({
         domainsList: [],
         decodedDomainList: [],
         formIsValid: false,
      });
   }

   render() {
      const domains = this.state.domainsList.map(domain => domain).join('\n');

      let domainCheck = null;
      if (this.state.decodedDomainList.length > 0) {
         domainCheck = <DomainCheck listDomains={this.state.decodedDomainList} />;
      }
      return (
         <div className={classes.DomainList}>
            <form onSubmit={this.checkDomains}>
               <Textarea
                  change={this.domainListHandle}
                  value={domains}
                  readOnly={this.state.checking}
                  placeholder='List of domain names to check'></Textarea>
               <div className={classes.Buttons}>
                  <Button
                     clicked={this.clearDomains}
                     type="reset">Clear</Button>
                  <Button
                     clicked={this.clearDomains}
                     disabled={!this.state.formIsValid || this.state.checking}>Check</Button>
               </div>
            </form>
            {domainCheck}
         </div>
      );
   }
}

export default DomainList;