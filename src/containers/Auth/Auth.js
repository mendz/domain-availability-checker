import React, { Component } from 'react';
import isEmail from 'validator/lib/isEmail';

import classes from './Auth.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Footer from './AuthFooter/AuthFooter';
import GoogleSignIn from '../../components/UniqueButtons/GoogleSignIn/GoogleSignIn';

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

    this.setState({ controls: updatedControls });
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
      />
    ));

    const header = this.state.title[this.state.formType];
    const buttonText = this.state.buttonText[this.state.formType];
    let googleSignUp = null;

    if (this.state.formType === IS_LOGIN) {
      googleSignUp = (
        <GoogleSignIn clicked={() => console.log('continue with google')} />
      );
    }

    return (
      <div className={classes.Container}>
        <h1>{header}</h1>
        <form onSubmit={this.handleSubmit}>
          {form}
          <Button disabled={!this.state.formIsValid}>{buttonText}</Button>
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

export default Auth;
