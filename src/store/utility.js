export const updateObject = (oldObject, updateProperties) => ({
  ...oldObject,
  ...updateProperties,
});

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

export const saveToLocalHistory = decodedDomainList => {
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
  // return the current history in case that we loaded and old history
  return JSON.parse(currentHistory);
};

export const loadLocalHistory = () => {
  const historyString = localStorage.getItem('historyDomains');

  if (historyString) {
    const history = JSON.parse(historyString);
    return history;
  }
  return [];
};

export const removeLocalHistory = () => {
  localStorage.removeItem('historyDomains');
};
