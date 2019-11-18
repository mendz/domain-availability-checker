import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

export const firebaseApp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
});

export const gmailAuthProvider = new firebase.auth.GoogleAuthProvider();

export const setUser = (userId, userData) =>
  firebaseApp
    .database()
    .ref(`users/${userId}`)
    .set(...userData);

export const getUser = userId =>
  firebaseApp
    .database()
    .ref(`users/${userId}`)
    .on('value', snapshot => snapshot.val());

export const setHistoryDomains = (domainsData, userId) => {
  console.log('userId:', userId);
  console.log('domainsData:', domainsData);
  domainsData.forEach(domainData => {
    // get a key for a new the domain
    const domainId = firebaseApp
      .database()
      .ref()
      .child('historyDomains')
      .push().key;

    domainData.userId = userId;
    firebaseApp
      .database()
      .ref(`historyDomains/${domainId}`)
      .set(...domainData);
  });
};

export const getHistoryDomains = userId =>
  firebaseApp
    .database()
    .ref(`historyDomains/`)
    .orderByChild('userId')
    .equalTo(userId)
    .on('value', snapshot => snapshot.val());
