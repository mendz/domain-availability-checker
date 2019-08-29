export const updateObject = (oldObject, updateProperties) => ({
  ...oldObject,
  ...updateProperties,
});

// FIXME: Move is back to the domain list action in order to log the error in the store
export const checkAvailable = async (domainName, axios) => {
  // check if debug is on
  let debug = '';
  if (process.env.REACT_APP_DEBUG) {
    debug = '?debug';
  }

  const response = await axios(`available/${domainName}${debug}`).catch(err =>
    console.error(`ERROR!!!\n${err}`)
  );
  return response;
};

export const saveToHistory = decodedDomainList => {
  const oldHistoryString = localStorage.getItem('historyDomains');
  let currentHistory = '';

  // if there already history it will filter from it the domains that are in the current check
  // and concat the old history
  if (oldHistoryString) {
    const oldHistory = JSON.parse(oldHistoryString);
    const filteredOld = oldHistory.filter(
      currentHistory =>
        !decodedDomainList.find(domain => domain.name === currentHistory.name)
    );
    const combineHistory = decodedDomainList.concat(filteredOld);
    currentHistory = JSON.stringify(combineHistory);
  } else {
    currentHistory = JSON.stringify(decodedDomainList);
  }

  localStorage.setItem('historyDomains', currentHistory);
};