import * as actionTypes from './actionTypes';
import axios from '../../axios/axios-domains';
import { checkAvailable } from '../utility';
import { throwError } from '../../utils/setupErrorsTrack';
import { getDomainFromRequest } from '../../utils/normalizeDomain';

const setDecodedDomainsStart = () => ({
  type: actionTypes.SET_DECODED_DOMAINS_START,
});

const setDecodedDomainsSuccess = () => ({
  type: actionTypes.SET_DECODED_DOMAINS_SUCCESS,
});

const setDecodedDomainsFail = () => ({
  type: actionTypes.SET_DECODED_DOMAINS_FAIL,
});

const updateDecodedDomainsAll = decodedDomains => ({
  type: actionTypes.UPDATE_DECODE_DOMAINS_ALL,
  decodedDomains,
});

export const clearDecodedDomains = () => ({
  type: actionTypes.CLEAR_DECODED_DOMAINS,
});

const updatedDecodedDomainItem = (domainName, resultDomain) => ({
  type: actionTypes.UPDATE_DECODE_DOMAINS_ITEM,
  domainName,
  resultDomain,
});

const saveToHistory = () => ({
  type: actionTypes.SAVE_DOMAINS_TO_HISTORY,
});

export const setDecodedDomains = (
  domainsList,
  invalidDomains
) => async dispatch => {
  dispatch(setDecodedDomainsStart());
  // update the state with raw information - invalid / loading
  const decodedDomainListRaw = [...new Set(domainsList)]
    .filter(domain => domain.trim() !== '')
    .map(domain => {
      const isInvalid = invalidDomains.find(
        invalidDomain => invalidDomain === domain
      );

      if (!isInvalid) {
        return {
          name: domain,
          availability: null,
          networkError: false,
          invalid: false,
        };
      } else {
        return {
          name: domain,
          availability: false,
          networkError: false,
          invalid: true,
        };
      }
    });

  dispatch(updateDecodedDomainsAll(decodedDomainListRaw));

  // start checking the domain and update the state per domain
  const finishCheckingFiltered = decodedDomainListRaw.filter(
    domain => !domain.invalid
  );

  for (const domain of finishCheckingFiltered) {
    // FIXME: Find a way to log the the error in the store and show only once the modal with error and not in every network error.
    const response = await checkAvailable(domain.name, axios);
    let resultDomain = {};

    // no response due to error, no need to continue check this domain
    if (!response) {
      resultDomain = {
        ...domain,
        name: domain.name,
        networkError: true,
      };

      dispatch(updatedDecodedDomainItem(domain.name, resultDomain));

      throwError('No response data', resultDomain);

      continue;
    }

    const { data, statusText, config } = response;

    if (data && statusText === 'OK') {
      resultDomain = {
        ...domain,
        name: data.domain,
        availability: data.isAvailable,
      };
    } else if (!statusText === 'OK') {
      resultDomain = {
        ...domain,
        name: getDomainFromRequest(config.url),
        networkError: true,
      };
    }

    dispatch(updatedDecodedDomainItem(domain.name, resultDomain));
  }

  // wait for all the checking to finish in order to reopen the textarea
  dispatch(setDecodedDomainsSuccess());
  dispatch(saveToHistory());
};
