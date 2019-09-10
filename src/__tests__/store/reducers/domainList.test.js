import reducer from '../../../store/reducers/domainList.js';
import * as actionTypes from '../../../store/actions/actionTypes';

const mockDecodeDomainListArr = [
  { name: 'test', availability: false, networkError: false, invalid: true },
  {
    name: 'www.w3schools',
    availability: false,
    networkError: false,
    invalid: true,
  },
  {
    name: 'github.com',
    availability: false,
    networkError: false,
    invalid: false,
  },
  {
    name: 'a.com',
    availability: true,
    networkError: false,
    invalid: false,
  },
];

const mockDecodeDomainBeforeCheck = [
  {
    name: 'github.com',
    availability: null,
    networkError: false,
    invalid: false,
  },
  {
    name: 'a.com',
    availability: null,
    networkError: false,
    invalid: false,
  },
];

describe('domain list reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      decodedDomainList: [],
      checking: false,
      networkError: false,
    });
  });

  it('should store the decoded domains upon update all the domains', () => {
    expect(
      reducer(undefined, {
        type: actionTypes.UPDATE_DECODE_DOMAINS_ALL,
        decodedDomains: mockDecodeDomainListArr,
      })
    ).toEqual({
      decodedDomainList: mockDecodeDomainListArr,
      checking: false,
      networkError: false,
    });
  });

  it('should update one decoded domain', () => {
    expect(
      reducer(
        {
          decodedDomainList: mockDecodeDomainBeforeCheck,
          checking: true,
          networkError: false,
        },
        {
          type: actionTypes.UPDATE_DECODE_DOMAINS_ITEM,
          domainName: 'a.com',
          resultDomain: {
            name: 'a.com',
            availability: false,
            networkError: false,
            invalid: false,
          },
        }
      )
    ).toEqual({
      decodedDomainList: [
        {
          name: 'github.com',
          availability: null,
          networkError: false,
          invalid: false,
        },
        {
          name: 'a.com',
          availability: false,
          networkError: false,
          invalid: false,
        },
      ],
      checking: true,
      networkError: false,
    });
  });

  it('should clear the decoded domains array', () => {
    expect(
      reducer(
        {
          decodedDomainList: mockDecodeDomainListArr,
          checking: false,
          networkError: false,
        },
        {
          type: actionTypes.CLEAR_DECODED_DOMAINS,
        }
      )
    ).toEqual({
      decodedDomainList: [],
      checking: false,
      networkError: false,
    });
  });
});
