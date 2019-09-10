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

const checkConnectionStart = () => ({
  type: actionTypes.CHECK_CONNECTION_START,
});

const checkConnectionFail = () => ({
  type: actionTypes.CHECK_CONNECTION_FAIL,
});

const checkConnectionSuccess = () => ({
  type: actionTypes.CHECK_CONNECTION_SUCCESS,
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

export const setDecodedDomains = (
  domainsList,
  invalidDomains
) => async dispatch => {
  dispatch(checkConnectionStart(axios));
  const response = await axios();

  // check if there is connection
  if (!response) {
    dispatch(checkConnectionFail());
  } else {
    dispatch(checkConnectionSuccess());
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
  }
};
