import React from 'react';
import isEmail from 'validator/lib/isEmail';

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
        <button type="button" disabled={ isDisabled }>Entrar</button>
      </div>
    );
  }
}

export default Login;
