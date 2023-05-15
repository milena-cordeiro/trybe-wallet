import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAction, addExpenses } from '../redux/actions';
import requestExchangeRates from '../helpers/request';
// import addExpenses from '../redux/actions/walletActions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: '',
    method: 'Dinheiro',
    tag: 'Alimentação' };

  async componentDidMount() {
    const { fetching } = this.props;

    await fetching();
    const { currencies } = this.props;
    this.setState({
      currency: currencies[0],
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    // console.log(name, value);
    this.setState({
      [name]: value,
    });
  };

  handleClickBtn = async () => {
    const { currencies, addExpense, expenses } = this.props;
    const exchangeRates = await requestExchangeRates();
    const expense = {
      id: expenses.length,
      ...this.state,
      exchangeRates };
    // console.log(expense);

    addExpense(expense);

    this.setState({
      value: '',
      description: '',
      currency: currencies[0],
      method: 'Dinheiro',
      tag: 'Alimentação' });
  };

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <label htmlFor="value-input">
          Valor:
        </label>
        <input
          onChange={ this.handleChange }
          data-testid="value-input"
          type="number"
          name="value"
          id="value-input"
        />
        <label htmlFor="currency-input">
          Moeda:
        </label>
        <select
          onChange={ this.handleChange }
          data-testid="currency-input"
          name="currency"
          id="currency-input"
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
        <label htmlFor="method-input">
          Metodo de pagamento:
        </label>
        <select
          onChange={ this.handleChange }
          data-testid="method-input"
          name="method"
          id="method-input"
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <br />
        <label htmlFor="tag-input">
          Tag:
        </label>
        <select
          onChange={ this.handleChange }
          data-testid="tag-input"
          name="tag"
          id="tag-input"
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <br />
        <label htmlFor="description-input">
          Descreva a despesa:
        </label>
        <input
          onChange={ this.handleChange }
          data-testid="description-input"
          type="text"
          name="description"
          id="description-input"
        />
        <button onClick={ this.handleClickBtn } type="button">Adicionar despesa</button>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  fetching: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetching: () => dispatch(fetchAction()),
  addExpense: (expense) => dispatch(addExpenses(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
