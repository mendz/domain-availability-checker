import React from 'react';
import PropTypes from 'prop-types';
import CSSTransition from 'react-transition-group/CSSTransition';

import Backdrop from '../Backdrop/Backdrop';

import classes from './Modal.module.css';

const animationTimeout = {
   enter: 400,
   exit: 1000
}

const Modal = ({ show, closed, children }) => {
   return (
      <>
         {show && <Backdrop closed={closed} />}
         <CSSTransition
            mountOnEnter
            unmountOnExit
            in={show}
            timeout={animationTimeout}
            classNames={{
               enterActive: classes.ModalOpen,
               exitActive: classes.ModalClose
            }}>
            <div className={classes.Modal}>
               {children}
            </div>
         </CSSTransition>
      </>
   );
}

Modal.propTypes = {
   show: PropTypes.bool,
   closed: PropTypes.func
}

export default Modal;
