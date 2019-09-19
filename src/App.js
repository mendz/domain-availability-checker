import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import firebase from 'firebase/app';
import 'firebase/auth';

import { setUser } from './store/actions/auth';

import Layout from './hoc/Layout/Layout';
import History from './containers/HistoryDomains/HistoryDomains';
import DomainList from './containers/DomainList/DomainList';

import classes from './App.module.css';

class App extends React.Component {
  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (!this.props.isLoggedIn && !this.props.isAuthLoading) {
        this.props.setUser(user);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div className={classes.App}>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route path="/history" component={History} />
              <Route exact path="/" component={DomainList} />
              <Redirect to="/" />
            </Switch>
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.userId ? true : false,
  isAuthLoading: state.auth.loading,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setUser }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
