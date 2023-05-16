import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Table.css';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <div>
        <h1>Tabela de Gastos</h1>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => {
              const valorConvertido = (
                Number(
                  expense.exchangeRates[expense.currency].ask,
                ) * Number(expense.value));

              const valorDeCambio = (
                parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2));
              return (
                <tr key={ expense.id }>
                  <td>{expense.description}</td>
                  <td>{expense.tag}</td>
                  <td>{expense.method}</td>
                  <td>{Number(expense.value).toFixed(2)}</td>
                  <td>{expense.exchangeRates[expense.currency].name}</td>
                  <td>{valorDeCambio}</td>
                  <td>{valorConvertido.toFixed(2)}</td>
                  <td>Real</td>
                  <td>
                    <button data-testid="delete-btn">Excluir</button>
                    <button data-testid="edit-btn">Editar</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
