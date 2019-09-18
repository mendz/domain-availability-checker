import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { showAuthModal, closeAuthModal } from '../../store/actions/auth.js';

import Button from '../UI/Button/Button.js';
import Modal from '../UI/Modal/Modal.js';
import Auth from '../../containers/Auth/Auth.js';

const AuthModal = ({ authModal, isLogin, showAuthModal, closeAuthModal }) => {
  if (isLogin) return null;

  return (
    <>
      <Button onClick={showAuthModal}>Log In / Sign Up</Button>
      <Modal show={authModal} closed={closeAuthModal}>
        <Auth />
      </Modal>
    </>
  );
};

const mapStateToProps = state => ({
  authModal: state.auth.authModal,
  isLogin: state.auth.isLogin,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ showAuthModal, closeAuthModal }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthModal);
