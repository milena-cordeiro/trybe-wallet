import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAction } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { fetching } = this.props;

    fetching();
  }

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <label htmlFor="value-input">
          Valor:
        </label>
        <input data-testid="value-input" type="number" name="valor" id="value-input" />
        <label htmlFor="currency-input">
          Moeda:
        </label>
        <select data-testid="currency-input" name="moeda" id="currency-input">
          {currencies
            .map((element) => (
              <option
                key={ Math.random() }
                value={ element }
              >
                {element}

              </option>))}
        </select>
        <br />
        <label htmlFor="method-input">
          Metodo de pagamento:
        </label>
        <select data-testid="method-input" name="metodo-de-pagamento" id="method-input">
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <br />
        <label htmlFor="tag-input">
          Tag:
        </label>
        <select data-testid="tag-input" name="" id="tag-input">
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
          data-testid="description-input"
          type="text"
          name="description"
          id="description-input"
        />
        <button type="button">Adicionar despesa</button>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetching: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetching: () => dispatch(fetchAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
