import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  somaExpenses = () => {
    const { expenses } = this.props;

    return expenses.reduce((total, expense) => (
      total + (
        Number(expense.exchangeRates[expense.currency].ask) * Number(expense.value))
    ), 0);
  };

  render() {
    const { userEmail } = this.props;
    return (
      <div>
        <header>
          <h1>WALLET</h1>
          <p data-testid="email-field">
            Email:
            {userEmail}
          </p>
          <p>
            Despesa Total:
            <span data-testid="total-field">
              {this.somaExpenses().toFixed(2)}
            </span>
            <span data-testid="header-currency-field">
              BRL
            </span>
          </p>
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
