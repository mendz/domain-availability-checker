import React, { Component } from 'react';
import isURL from 'validator/lib/isURL';

import DomainCheck from '../../components/DomainCheck/DomainCheck';

import classes from './DomainList.module.css';

class DomainList extends Component {
   state = {
      domainsList: [],
      validation: {
         required: true,
         isUrl: true,
         errorMessage: 'Please enter a at least one domain.'
      },
      invalidDomains: [],
      formIsValid: false
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
            .filter(domain => !isURL(domain.name))
            .map(domain => domain.name);

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
         .map(domain => ({ name: domain, availability: null }));

      // this.setState({ domainToCheck: domains });

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
      console.log('submit');
      // const domainResult = this.state.domainToCheck.map(domain => {
      //    fetch(`http://localhost:1598/available/${domain.name}`)
      //       .then(response => response.json())
      //       .then(data => {
      //          console.log('data:', data)
      //          domain.availability = data.isAvailable;
      //          console.log({ domain });
      //          return domain;
      //       })
      //       .catch(err => console.error(err));
      // });
   }

   clearDomains = () => {
      this.setState({ domainsList: [] });
   }

   cleanDomains = () => {

   }

   render() {
      const domains = this.state.domainsList.map(domain => domain.name).join('\n');

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
            <DomainCheck listDomains={this.state.domainsList} invalidDomains={this.state.invalidDomains} />
         </div>
      );
   }
}

export default DomainList;