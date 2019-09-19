import React, { Component } from 'react';
import isEmail from 'validator/lib/isEmail';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  authGoogleSignIn,
  authEmailPassword,
  resetPassword,
} from '../../store/actions/auth';

import classes from './Auth.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Footer from './AuthFooter/AuthFooter';
import GoogleSignIn from '../../components/UniqueButtons/GoogleSignIn/GoogleSignIn';
import Spinner from '../../components/UI/Spinner/Spinner';

export const IS_LOGIN = 'IS_LOGIN';
export const IS_SIGN_UP = 'IS_SIGN_UP';
export const IS_FORGOT_PASSWORD = 'IS_FORGOT_PASSWORD';

class Auth extends Component {
  state = {
    formType: IS_LOGIN,
    formIsValid: false,
    controls: {
      email: {
        formTypes: [IS_LOGIN, IS_SIGN_UP, IS_FORGOT_PASSWORD],
        elementType: 'input',
        label: 'Email',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email Address',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        formTypes: [IS_LOGIN, IS_SIGN_UP],
        elementType: 'input',
        label: 'Password',
        elementConfig: {
          type: 'password',
          placeholder: 'Your Password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
          errorMessage: 'Password need to be at least 6 characters',
        },
        valid: false,
        touched: false,
      },
      secondPassword: {
        formTypes: [IS_SIGN_UP],
        elementType: 'input',
        label: 'Second Password',
        elementConfig: {
          type: 'password',
          placeholder: 'Please repeat the password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
          errorMessage: 'The two passwords need to be the same',
          isSame: 'password',
        },
        valid: false,
        touched: false,
      },
    },
    title: {
      IS_LOGIN: 'Login',
      IS_SIGN_UP: 'Sign Up',
      IS_FORGOT_PASSWORD: 'Reset Password',
    },
    buttonText: {
      IS_LOGIN: 'Login',
      IS_SIGN_UP: 'Sign Up',
      IS_FORGOT_PASSWORD: 'Send Recovery Email',
    },
  };

  updateObject = (oldObject, updatedProperties) => ({
    ...oldObject,
    ...updatedProperties,
  });

  resetControls = () => {
    const keys = Object.keys(this.state.controls);
    const updatedControls = { ...this.state.controls };

    keys.forEach(keyControl => {
      updatedControls[keyControl] = this.updateObject(
        this.state.controls[keyControl],
        {
          value: '',
          valid: false,
          touched: false,
        }
      );
    });

    this.setState({ controls: updatedControls, formIsValid: false });
  };

  changeFormType = type => {
    this.setState({ formType: type });
    this.resetControls();
  };

  inputChangedHandler = (event, controlName) => {
    const updatedControls = this.updateObject(this.state.controls, {
      [controlName]: this.updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation,
          this.state.controls
        ),
        touched: true,
      }),
    });

    const formIsValid = Object.values(updatedControls)
      .filter(control => control.formTypes.includes(this.state.formType))
      .every(control => control.valid);

    this.setState({ controls: updatedControls, formIsValid });
  };

  checkValidity = (value, rules, allControls) => {
    let isValid = true;

    // in case the input doesn't have any rules.
    if (!rules) return true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      isValid = isEmail(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isSame) {
      isValid = value === allControls[rules.isSame].value && isValid;
    }

    return isValid;
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.formType !== IS_FORGOT_PASSWORD) {
      this.props.authEmailPassword(
        this.state.controls.email.value,
        this.state.controls.password.value,
        this.state.formType === IS_SIGN_UP
      );
    } else {
      this.props.resetPassword(this.state.controls.email.value);
    }
  };

  render() {
    const formElementArray = [];

    for (const [key, value] of Object.entries(this.state.controls)) {
      if (value.formTypes.includes(this.state.formType)) {
        formElementArray.push({
          id: key,
          config: value,
        });
      }
    }

    const form = formElementArray.map(formElement => (
      <Input
        key={formElement.id}
        label={formElement.config.label}
        elementConfig={formElement.config.elementConfig}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        errorMessage={
          formElement.config.validation
            ? formElement.config.validation.errorMessage
            : null
        }
        touched={formElement.config.touched}
        changed={event => this.inputChangedHandler(event, formElement.id)}
        value={formElement.config.value}
        disabled={this.props.isLoading}
      />
    ));

    const header = this.state.title[this.state.formType];
    const buttonText = this.state.buttonText[this.state.formType];
    let googleSignUp = null;

    if (this.state.formType === IS_LOGIN) {
      googleSignUp = (
        <GoogleSignIn
          clicked={() => this.props.authGoogleSignIn()}
          disabled={this.props.isLoading}
        />
      );
    }

    let error = null;
    if (this.props.authError) {
      error = (
        <p className={classes.Error} style={{ fontSize: '1.2rem' }}>
          Error: {this.props.authError}
        </p>
      );
    }

    let loading = null;
    if (this.props.isLoading) {
      loading = <Spinner center />;
    }

    return (
      <div className={classes.Container}>
        <h1>{header}</h1>
        {loading}
        {error}
        <form onSubmit={this.handleSubmit}>
          {form}
          <Button disabled={!this.state.formIsValid || this.props.isLoading}>
            {buttonText}
          </Button>
        </form>
        {googleSignUp}
        <Footer
          formType={this.state.formType}
          changeFormType={this.changeFormType}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authError: state.auth.error,
  isLoading: state.auth.loading,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { authGoogleSignIn, authEmailPassword, resetPassword },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
