// import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseApp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
});

const gmailAuthProvider = new firebase.auth.GoogleAuthProvider();
// const base = Rebase.createClass(firebase.database);

export { firebaseApp, gmailAuthProvider };

// export default base;
