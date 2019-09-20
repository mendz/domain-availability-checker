import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from '../UI/Button/Button';
import ButtonInfo from '../UniqueButtons/ButtonInfo/ButtonInfo';
import Modal from '../UI/Modal/Modal';
import Info from '../Info/Info';
import AuthModal from '../UniqueButtons/AuthModal';

import classes from './Toolbar.module.css';

class Toolbar extends Component {
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
            disabled={this.props.isChecking}
          >
            History
          </Button>
          <div className={classes.LeftButtons}>
            <AuthModal disabled={this.props.isChecking} />
            <ButtonInfo
              clicked={this.showInfoModal}
              disabled={this.props.isChecking}
            />
            <Modal show={this.state.showInfo} closed={this.closeInfoModal}>
              <Info />
            </Modal>
          </div>
        </>
      );
    }

    return <div className={classes.Toolbar}>{toolbar}</div>;
  }
}

const mapStateToProps = state => ({
  isChecking: state.domainList.checking,
});

export default connect(mapStateToProps)(withRouter(Toolbar));

export { Toolbar };
