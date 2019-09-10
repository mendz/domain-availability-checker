import { saveToHistory, loadHistory, removeHistory } from '../../store/utility';

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
  it('should save to local history', () => {
    saveToHistory(mockDecodeDomainListArr);
    const domainsFromHistory = localStorage.getItem('historyDomains');
    expect(JSON.parse(domainsFromHistory)).toEqual(mockDecodeDomainListArr);
  });

  it('should save and add to current local history', () => {
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

  it('should load from local history', () => {
    localStorage.setItem(
      'historyDomains',
      JSON.stringify(mockDecodeDomainListArr)
    );
    const historyDomains = loadHistory();
    expect(historyDomains).toEqual(mockDecodeDomainListArr);
  });

  it('should remove the local history', () => {
    localStorage.setItem(
      'historyDomains',
      JSON.stringify(mockDecodeDomainListArr)
    );
    removeHistory();
    const historyDomains = localStorage.getItem('historyDomains');
    expect(historyDomains).toBeNull();
  });
});
