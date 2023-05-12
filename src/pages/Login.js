import React from 'react';

class Login extends React.Component {
  state = {
    isDisabled: true,
  };

  handleChange = ({ target }) => {
    const { type, value } = target;
    // console.log(value);
    const min = 6;
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const verifyEmail = type === 'email' && value.match(regex);
    const verifyPassWord = type === 'password' && value >= min;

    if (verifyEmail && verifyPassWord) {
      this.setState((prevState) => ({
        isDisabled: !prevState.state,
      }));
    }
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
