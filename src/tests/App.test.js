import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { App } from '../App';
// import Header from '../components/Header';
import mockData from './helpers/mockData';

beforeEach(() => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  });
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('Testa a renderização da página de Login e seus elementos', () => {
  it('deve renderizar a page de Login', () => {
    renderWithRouterAndRedux(<App />);

    const homeTitle = screen.getByRole('heading', {
      name: 'Trybe Wallet',
    });
    expect(homeTitle).toBeInTheDocument();
  });

  it('deve renderizar os inputs para email e senha', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByPlaceholderText(/email/i);
    expect(inputEmail).toBeInTheDocument();

    const inputPassword = screen.getByPlaceholderText(/senha/i);
    expect(inputPassword).toBeInTheDocument();
  });

  it('deve renderizar um botão com o texto "Entrar"', () => {
    renderWithRouterAndRedux(<App />);

    const sendBtn = screen.getByRole('button', { name: 'Entrar' });
    expect(sendBtn).toBeInTheDocument();
    expect(sendBtn.disabled).toBeTruthy();
  });

  it('se ao digitar no input de email e senha o botão fica habilitado', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByPlaceholderText(/email/i);
    userEvent.type(inputEmail, 'nome@email.com');
    const inputPassword = screen.getByPlaceholderText(/senha/i);
    userEvent.type(inputPassword, '123456');

    const sendBtn = screen.getByRole('button', { name: 'Entrar' });
    expect(sendBtn.disabled).toBeFalsy();
  });
  it(
    'se ao clicar no botão de enviar a página é redirecionada para /carteira',
    async () => {
      renderWithRouterAndRedux(<App />);

      const inputEmail = screen.getByPlaceholderText(/email/i);
      userEvent.type(inputEmail, 'nome@email.com');
      const inputPassword = screen.getByPlaceholderText(/senha/i);
      userEvent.type(inputPassword, '123456');

      const sendBtn = screen.getByRole('button', { name: 'Entrar' });
      expect(sendBtn.disabled).toBeFalsy();

      userEvent.click(sendBtn);

      const walletUser = screen.getByText(/nome@email.com/i);
      expect(walletUser).toBeInTheDocument();
    },
  );
});

describe('Testa a renderização do componente Header', () => {
  it('deve renderizar os elementos do Header', () => {
    const initialEntries = ['/carteira'];
    const initialState = {
      user: {
        email: 'email@email.com',
      },
    };
    renderWithRouterAndRedux(<App />, { initialEntries, initialState });

    const walletTitle = screen.getByRole('heading', {
      name: /wallet/i,
    });
    expect(walletTitle).toBeInTheDocument();

    const displayEmailUser = screen.getByText(/email:email@email.com/i);
    const displayTotalExpense = screen.getByText(/0\.00/i);
    expect(displayEmailUser).toBeInTheDocument();
    expect(displayTotalExpense).toBeInTheDocument();

    expect(fetch).toBeCalledWith('https://economia.awesomeapi.com.br/json/all');
    expect(fetch).toBeCalled();
    expect(fetch).toBeCalledTimes(1);
  });
});

describe('Testa a renderização do componente WalletForm', () => {
  it('deve renderizar os elementos do WalletForm', () => {
    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(<App />, { initialEntries });

    const walletFormTitle = screen.getByRole('heading', {
      name: /tabela de gastos/i,
    });
    expect(walletFormTitle).toBeInTheDocument();

    // const inputValue = screen.getByLabelText(/valor/i);
    // const inputMoeda = screen.getByLabelText(/moeda/i);
    // const inputPagamento = screen.getByLabelText(/metodo de pagamento/i);
    // const inputTag = screen.getByLabelText(/tag/i);

    // expect(inputValue).toBeInTheDocument();
    // expect(inputMoeda).toBeInTheDocument();
    // expect(inputPagamento).toBeInTheDocument();
    // expect(inputTag).toBeInTheDocument();
  });
  // it('se o total de despesa no Header é atualizado', async () => {
  //   const initialEntries = ['/carteira'];
  //   renderWithRouterAndRedux(<App />, { initialEntries });

  //   const inputValue = screen.getByLabelText(/valor/i);
  //   const addBtn = screen.getByRole('button', { name: 'Adicionar despesa' });
  // });
});
