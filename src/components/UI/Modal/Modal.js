import React from 'react';
import PropTypes from 'prop-types';
import CSSTransition from 'react-transition-group/CSSTransition';
import styled, { css } from 'styled-components/macro';

import Backdrop from '../Backdrop/Backdrop';

import classes from './Modal.module.css';

const animationTimeout = {
  enter: 400,
  exit: 1000,
};

const Modal = ({ show, closed, children }) => (
  <ModalMainWrapper show={show}>
    {show && <Backdrop closed={closed} />}
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={show}
      timeout={animationTimeout}
      classNames={{
        enterActive: classes.ModalOpen,
        exitActive: classes.ModalClose,
      }}
    >
      <ModalContentWrapper>
        <div className={classes.Modal}>{children}</div>
      </ModalContentWrapper>
    </CSSTransition>
  </ModalMainWrapper>
);

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  closed: PropTypes.func.isRequired,
};

const ModalMainWrapper = styled.div`
  overflow: hidden;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 501;
  ${props =>
    !props.show &&
    css`
      display: none;
    `};
`;

const ModalContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  max-width: 100%;
  width: 100%;
  height: 100%;
`;

export default Modal;
