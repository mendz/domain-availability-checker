import React from 'react';
import PropTypes from 'prop-types';
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
  disabled,
}) => {
  const style = {
    minWidth: '165px',
  };

  let content = (
    <>
      <Button onClick={showAuthModal} style={style} disabled={disabled}>
        Log In / Sign Up
      </Button>
      <Modal show={authModal} closed={closeAuthModal}>
        <Auth />
      </Modal>
    </>
  );

  if (isLoggedIn) {
    content = (
      <Button onClick={authLogOut} style={style} disabled={disabled}>
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

AuthModal.propTypes = {
  disabled: PropTypes.bool,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthModal);

export { AuthModal };
