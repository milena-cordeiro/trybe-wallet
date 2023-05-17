import PropTypes from 'prop-types';
import React from 'react';
import isEmail from 'validator/lib/isEmail';
import { connect } from 'react-redux';
import { addEmail } from '../redux/actions';
import './Login.css';

class Login extends React.Component {
  state = {
    isDisabled: true,
    email: '',
    password: '',
  };

  validateFields = () => {
    const { email, password } = this.state;

    const min = 6;
    const verifyEmail = isEmail(email);
    const verifyPassWord = password.length >= min;

    this.setState({
      isDisabled: !(verifyEmail && verifyPassWord),
    });
  };

  handleChange = ({ target }) => {
    const { type, value } = target;

    this.setState({
      [type]: value,
    }, this.validateFields);
  };

  handleClick = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(addEmail(email));
    history.push('/carteira');
  };

  render() {
    const { isDisabled } = this.state;
    return (
      <div className="main-container">
        <h1>Trybe Wallet</h1>
        <form className="form__login">
          <h1 className="h1__login">LogIn</h1>
          <input
            className="input_login"
            type="email"
            placeholder="Email"
            data-testid="email-input"
            onChange={ this.handleChange }
          />
          <input
            className="input_login"
            type="password"
            placeholder="Senha"
            data-testid="password-input"
            onChange={ this.handleChange }
          />
          <button
            className="btn__login "
            type="button"
            disabled={ isDisabled }
            onClick={ this.handleClick }
          >
            Entrar

          </button>
        </form>
      </div>

    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
