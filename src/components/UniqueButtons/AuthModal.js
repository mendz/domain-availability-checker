import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  showAuthModal,
  closeAuthModal,
  authLogOut,
} from '../../store/actions/auth.js';

import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';
import Auth from '../../containers/Auth/Auth';

const AuthModal = ({
  authModal,
  isLoggedIn,
  showAuthModal,
  closeAuthModal,
  authLogOut,
}) => {
  const style = {
    minWidth: '165px',
  };

  let content = (
    <>
      <Button onClick={showAuthModal} style={style}>
        Log In / Sign Up
      </Button>
      <Modal show={authModal} closed={closeAuthModal}>
        <Auth />
      </Modal>
    </>
  );

  if (isLoggedIn) {
    content = (
      <Button onClick={authLogOut} style={style}>
        Log Out
      </Button>
    );
  }

  return content;
};

const mapStateToProps = state => ({
  authModal: state.auth.authModal,
  isLoggedIn: state.auth.userId ? true : false,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ showAuthModal, closeAuthModal, authLogOut }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthModal);
