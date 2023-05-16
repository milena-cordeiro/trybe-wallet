import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <br />
        <fieldset>
          <legend>Adicione despesas</legend>
          <WalletForm />
        </fieldset>
        <br />
        <Table />
      </div>
    );
  }
}

export default Wallet;
