import { saveToHistory } from '../../store/utility';

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

describe('utility: saveToHistory', () => {
  it('should save to history', () => {
    saveToHistory(mockDecodeDomainListArr);
    const domainsFromHistory = localStorage.getItem('historyDomains');
    expect(JSON.parse(domainsFromHistory)).toEqual(mockDecodeDomainListArr);
  });

  it('should save and add to current history', () => {
    const smallMockDecodeDomainListArr = [
      {
        name: 'test2',
        availability: false,
        networkError: false,
        invalid: true,
      },
    ];
    localStorage.setItem(
      'historyDomains',
      JSON.stringify(smallMockDecodeDomainListArr)
    );
    saveToHistory(mockDecodeDomainListArr);
    const domainsFromHistory = localStorage.getItem('historyDomains');
    expect(JSON.parse(domainsFromHistory)).toEqual([
      ...mockDecodeDomainListArr,
      ...smallMockDecodeDomainListArr,
    ]);
  });
});
