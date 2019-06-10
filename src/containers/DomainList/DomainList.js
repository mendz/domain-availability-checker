import React, { Component } from 'react';
import isURL from 'validator/lib/isURL';

import DomainCheck from '../../components/DomainCheck/DomainCheck';
import Spinner from '../../components/UI/Spinner/Spinner';

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
      loading: false
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
            .filter(domain => !isURL(domain));
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
         this.clearDomains();
         return;
      }

      const domains = e.target.value
         .split('\n')
         .map(domain => domain.startsWith('http') ? stripUrl(domain) : domain);

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
      this.setState({ loading: true });

      // massage the data
      const decodedDomainListPromises = this.state.domainsList
         .filter(domain => domain.trim() !== '')
         .map(domain => {
            const isInvalid = this.state.invalidDomains.find(invalidDomain => invalidDomain === domain);
            if (!isInvalid) {
               return axios(`available/${domain}`);
            } else {
               return {
                  name: domain,
                  availability: false,
                  networkError: false,
                  invalid: true
               }
            }
         });

      // wait for all the results
      const resultDecodedDomainList = await Promise
         .all(decodedDomainListPromises)
         .catch(err => console.error(`Error:\n${err}`));;

      const decodedDomainList = resultDecodedDomainList.map(domainData => {
         console.log('domainData:', domainData)
         // check that the request was OK
         if (domainData.data && domainData.statusText === 'OK') {
            const { data } = domainData;
            return {
               name: data.domain,
               availability: data.isAvailable,
               invalid: false,
               networkError: false,
            }
         } else if (!domainData.statusText === 'OK') {
            return {
               name: getDomainFromRequest(domainData.config.url),
               networkError: true,
               availability: false,
               invalid: false,
            }
         }

         // invalid domain
         return domainData;
      })

      this.setState({ decodedDomainList, loading: false });
   }

   clearDomains = () => {
      this.setState({
         domainsList: [],
         decodedDomainList: []
      });
   }

   cleanDomains = () => {

   }

   render() {
      const domains = this.state.domainsList.map(domain => domain).join('\n');

      let domainCheck = null;
      if (this.state.loading) {
         domainCheck = <Spinner />;
      } else if (this.state.decodedDomainList.length > 0) {
         domainCheck = <DomainCheck listDomains={this.state.decodedDomainList} />;
      }
      return (
         <div className={classes.DomainList}>
            <form onSubmit={this.checkDomains}>
               <textarea
                  className={classes.Textarea}
                  onChange={this.domainListHandle}
                  value={domains}
                  placeholder='List of domain names to check'></textarea>
               <div className={classes.Buttons}>
                  <button
                     onClick={this.clearDomains}
                     type="reset">Clear</button>
                  <button
                     type='submit'
                     disabled={!this.state.formIsValid}>Check</button>
               </div>
            </form>
            {domainCheck}
         </div>
      );
   }
}

export default DomainList;