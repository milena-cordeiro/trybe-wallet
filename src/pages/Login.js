import PropTypes from 'prop-types';
import React from 'react';
import isEmail from 'validator/lib/isEmail';
import { connect } from 'react-redux';
import { addEmail } from '../redux/actions';

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
      <div>
        <h1>Trybe Wallet</h1>
        <input
          type="email"
          placeholder="Email"
          data-testid="email-input"
          onChange={ this.handleChange }
        />
        <input
          type="password"
          placeholder="Senha"
          data-testid="password-input"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          disabled={ isDisabled }
          onClick={ this.handleClick }
        >
          Entrar

        </button>
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
