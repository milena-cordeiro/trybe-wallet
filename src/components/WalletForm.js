import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAction, requestExchangeRates } from '../redux/actions';

const INITIAL_STATE = {
  id: 0,
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class WalletForm extends Component {
  state = {
    ...INITIAL_STATE,
  };

  async componentDidMount() {
    const { dispatch } = this.props;

    dispatch(fetchAction());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClickBtn = (event) => {
    event.preventDefault();
    this.setState((prevState) => ({
      ...INITIAL_STATE,
      id: prevState.id + 1,
    }));

    const { dispatch } = this.props;
    dispatch(requestExchangeRates(this.state));
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <label htmlFor="value">
          Valor:
        </label>
        <input
          onChange={ this.handleChange }
          data-testid="value-input"
          type="number"
          name="value"
          id="value"
          value={ value }
        />
        <label htmlFor="currency">
          Moeda:
        </label>
        <select
          onChange={ this.handleChange }
          data-testid="currency-input"
          name="currency"
          id="currency"
          value={ currency }
        >
          {currencies
            .map((element) => (
              <option
                key={ element }
                value={ element }
              >
                {element}

              </option>))}
        </select>
        <br />
        <label htmlFor="method">
          Metodo de pagamento:
        </label>
        <select
          onChange={ this.handleChange }
          data-testid="method-input"
          name="method"
          id="method"
          value={ method }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <br />
        <label htmlFor="tag">
          Tag:
        </label>
        <select
          onChange={ this.handleChange }
          data-testid="tag-input"
          name="tag"
          id="tag"
          value={ tag }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <br />
        <label htmlFor="description">
          Descreva a despesa:
        </label>
        <input
          onChange={ this.handleChange }
          data-testid="description-input"
          type="text"
          name="description"
          id="description"
          value={ description }
        />
        <button
          onClick={ (event) => this.handleClickBtn(event) }
          type="button"
        >
          Adicionar despesa

        </button>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
