import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAction, requestExchangeRates,
  requestExchangeRatesEdited } from '../redux/actions';
import './WalletForm.css';

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

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(fetchAction());
  }

  componentDidUpdate(prevProps) {
    const { editor } = this.props;
    // console.log(prevProps);
    if (prevProps.editor !== editor) {
      this.handleEdit();
    }
  }

  handleSaveEditedExpense = (event) => {
    event.preventDefault();
    const { dispatch, expenses } = this.props;
    const editedExpense = this.state;
    const i = -1;

    dispatch(requestExchangeRatesEdited(editedExpense));
    this.setState({
      ...INITIAL_STATE,
      id: expenses.at(i).id + 1,
    });
  };

  handleEdit = () => {
    const { expenses, editor, idToEdit } = this.props;
    const editedExpense = expenses.find((expense) => expense.id === idToEdit);

    if (editor) {
      this.setState({
        id: editedExpense.id,
        value: editedExpense.value,
        description: editedExpense.description,
        currency: editedExpense.currency,
        method: editedExpense.method,
        tag: editedExpense.tag,
      });
    }
  };

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
    const { currencies, editor } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <form>
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
        {
          !editor ? (
            <button
              onClick={ (event) => this.handleClickBtn(event) }
              type="button"
            >
              Adicionar despesa

            </button>)
            : (
              <button
                onClick={ (event) => this.handleSaveEditedExpense(event) }
              >
                Editar Despesa

              </button>
            )

        }
        {/* <button
          onClick={ (event) => this.handleClickBtn(event) }
          type="button"
        >
          Adicionar despesa

        </button> */}
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
});

export default connect(mapStateToProps)(WalletForm);
