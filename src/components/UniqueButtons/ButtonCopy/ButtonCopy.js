import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '../../UI/Button/Button';
import copySvg from '../../../assets/icons/copy.svg';
import Modal from '../../UI/Modal/Modal';

import classes from './ButtonCopy.module.css';

const ButtonCopy = ({ children, copyText, disabled }) => {
  const [showModal, setShowModal] = useState(false);
  const [clipboardText, setClipboardText] = useState('');

  let buttonChildrenText = null;
  if (children) {
    buttonChildrenText = <span className={classes.Text}>{children}</span>;
  }

  const copy = textToCopy => {
    if (textToCopy) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          // copy the string to the clipboard!
          // console.log(`Copy: "${textToCopy}", to the clipboard!`);
          setClipboardText(textToCopy);
          setShowModal(true);
        })
        .catch(() =>
          console.error(`Failed to copy - '${textToCopy}' to the clipboard!`)
        );
    }
  };

  const listCopiedItems = clipboardText.split('\n').map(copiedText => (
    <p key={copiedText} className={classes.CopiedText}>
      {copiedText}
    </p>
  ));

  return (
    <>
      <Button
        disabled={disabled}
        className={classes.ButtonCopy}
        onClick={() => copy(copyText)}
      >
        <img src={copySvg} alt="Copy" />
        {buttonChildrenText}
      </Button>
      <Modal show={showModal} closed={() => setShowModal(false)}>
        <h3>Copied!</h3>
        {listCopiedItems}
      </Modal>
    </>
  );
};

ButtonCopy.propTypes = {
  copyText: PropTypes.string.isRequired,
};

export default ButtonCopy;
