import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Button from '../UI/Button/Button';
import ButtonInfo from '../UniqueButtons/ButtonInfo/ButtonInfo';
import Modal from '../UI/Modal/Modal';
import Info from '../Info/Info';

import classes from './Toolbar.module.css';

export class Toolbar extends Component {
  state = {
    showInfo: false,
  };

  showInfoModal = () => {
    this.setState({ showInfo: true });
  };

  closeInfoModal = () => {
    this.setState({ showInfo: false });
  };

  goToHistory = () => {
    this.props.history.push('/history');
  };

  goBack = () => {
    this.props.history.push('/');
  };

  render() {
    const { pathname } = this.props.location;
    let toolbar = null;
    if (pathname !== '/') {
      toolbar = <Button onClick={this.goBack}>Back Home</Button>;
    } else {
      toolbar = (
        <>
          <Button
            onClick={this.goToHistory}
            name="go-to-history"
            disabled={this.props.checking}
          >
            History
          </Button>
          <ButtonInfo clicked={this.showInfoModal} />
          <Modal show={this.state.showInfo} closed={this.closeInfoModal}>
            <Info />
          </Modal>
        </>
      );
    }

    return <div className={classes.Toolbar}>{toolbar}</div>;
  }
}

export default withRouter(Toolbar);
