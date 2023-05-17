import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { App } from '../App';
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
  it('se ao clicar no botão de enviar a página é redirecionada para /carteira', () => {
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
  });
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
  });
});

describe('Testa a renderização do componente WalletForm', () => {
  it('deve renderizar os elementos do WalletForm e se a API é chamada', () => {
    const initialEntries = ['/carteira'];
    // const initialState = {
    //   user: {
    //     email: 'email@email.com',
    //   },
    //   wallet: {
    //     isLoading: false,
    //     currencies: [], // array de string
    //     expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
    //     editor: false, // valor booleano que indica de uma despesa está sendo editada
    //     idToEdit: 0,
    //   },
    // };
    renderWithRouterAndRedux(<App />, { initialEntries });

    const walletFormTitle = screen.getByRole('heading', {
      name: /tabela de gastos/i,
    });
    expect(walletFormTitle).toBeInTheDocument();

    expect(fetch).toHaveBeenCalledWith('https://economia.awesomeapi.com.br/json/all');
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledTimes(1);

    const addBtn = screen.getByRole('button', { name: 'Adicionar despesa' });
    expect(addBtn).toBeInTheDocument();

    // const inputValue = screen.getByLabelText(/valor/i);
    // const inputMoeda = screen.getByLabelText(/moeda/i);
    // const inputPagamento = screen.getByLabelText(/metodo de pagamento/i);
    // const inputTag = screen.getByLabelText(/tag/i);

    // expect(inputValue).toBeInTheDocument();
    // expect(inputMoeda).toBeInTheDocument();
    // expect(inputPagamento).toBeInTheDocument();
    // expect(inputTag).toBeInTheDocument();
  });
  it('se o total de despesa no Header é atualizado e no click do botão adicionar a API é chamada', async () => {
    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(<App />, { initialEntries });

    const inputValue = screen.getByLabelText(/valor/i);
    userEvent.type(inputValue, '11');
    expect(inputValue.value).toBe('11');
    const addBtn = screen.getByRole('button', { name: /adicionar despesa/i });

    act(() => {
      userEvent.click(addBtn);
    });

    const totalExpense = await screen.findAllByText(/52\.28/i);
    expect(totalExpense[0]).toBeInTheDocument();
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith('https://economia.awesomeapi.com.br/json/all');
    expect(fetch).toBeCalledTimes(2);
  });

  it('se ao adicionar uma despesa a tabela é atualizada', async () => {
    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(<App />, { initialEntries });

    const inputValue = screen.getByLabelText(/valor/i);
    userEvent.type(inputValue, '11');
    expect(inputValue.value).toBe('11');
    // const inputMoeda = screen.getByRole('combobox', { name: /moeda/i });
    // act(() => {
    //   userEvent.selectOptions(inputMoeda, ['CAD', 'USD']);
    // });

    // expect(await screen.getByRole('option', { name: /cad/i }).selected).toBe(true);
    // expect(await screen.getByRole('option', { name: /usd/i }).selected).toBe(false);

    const addBtn = screen.getByRole('button', { name: /adicionar despesa/i });

    act(() => {
      userEvent.click(addBtn);
    });

    const convertedValue = await screen.findAllByText(/52\.28/i);
    expect(convertedValue[1]).toBeInTheDocument();
    const nameCoin = await screen.findByText('Dólar Americano/Real Brasileiro');
    expect(nameCoin).toBeInTheDocument();
  });

  it('se há os botões de excluir e editar e se ao clicar em excluir os valores de despesa total atualizam', async () => {
    const initialEntries = ['/carteira'];
    const { debug } = renderWithRouterAndRedux(<App />, { initialEntries });

    const inputValue = screen.getByLabelText(/valor/i);
    userEvent.type(inputValue, '12');
    expect(inputValue.value).toBe('12');

    const addBtn = screen.getByRole('button', { name: /adicionar despesa/i });

    act(() => {
      userEvent.click(addBtn);
    });

    const convertedValue = await screen.findAllByText(/57\.04/i);
    expect(convertedValue[1]).toBeInTheDocument();

    const deleteBtn = await screen.findByRole('button', { name: /excluir/i });
    const editBtn = await screen.findByRole('button', { name: /editar/i });
    expect(editBtn).toBeDefined();

    act(() => {
      userEvent.click(deleteBtn);
    });

    expect(convertedValue[0]).toHaveTextContent('0.0');
    debug();
  });
});

describe('Testa os botões de editar das despesas', () => {
  it('ao clicar no botão "editar" o botão de "editar despesa" aparece na tela', async () => {
    const initialEntries = ['/carteira'];

    renderWithRouterAndRedux(<App />, { initialEntries });

    const inputValue = screen.getByLabelText(/valor/i);
    userEvent.type(inputValue, '11');
    expect(inputValue.value).toBe('11');
    const inputDescription = screen.getByRole('textbox', { name: /descreva a despesa:/i });
    userEvent.type(inputDescription, 'lazer');

    const addBtn = screen.getByRole('button', { name: /adicionar despesa/i });

    act(() => {
      userEvent.click(addBtn);
    });

    const convertedValue = await screen.findAllByText(/52\.28/i);
    expect(convertedValue[1]).toBeInTheDocument();
    const nameCoin = await screen.findByText('Dólar Americano/Real Brasileiro');
    expect(nameCoin).toBeInTheDocument();
    const textDescription = await screen.findByText('lazer');
    expect(textDescription).toBeDefined();

    const editBtn = screen.getByRole('button', { name: /editar/i });

    act(() => {
      userEvent.click(editBtn);
    });

    const saveEditedExpenseBtn = await screen.findByRole('button', { name: /editar despesa/i });
    expect(saveEditedExpenseBtn).toBeDefined();
  });

  it('ao clicar no botão de "editar" e fazer alterações e depois salva-las a tabela é atualizada', async () => {
    const initialEntries = ['/carteira'];

    renderWithRouterAndRedux(<App />, { initialEntries });

    const inputValue = screen.getByLabelText(/valor/i);
    userEvent.type(inputValue, '11');
    expect(inputValue.value).toBe('11');
    const inputDescription = screen.getByRole('textbox', { name: /descreva a despesa:/i });
    userEvent.type(inputDescription, 'lazer');
    expect(inputDescription.value).toBe('lazer');

    const addBtn = screen.getByRole('button', { name: /adicionar despesa/i });

    act(() => {
      userEvent.click(addBtn);
    });

    const convertedValue = await screen.findAllByText(/52\.28/i);
    expect(convertedValue[1]).toBeInTheDocument();

    const editBtn = screen.getByRole('button', { name: /editar/i });

    act(() => {
      userEvent.click(editBtn);
    });

    userEvent.clear(inputValue);
    userEvent.type(inputValue, '12');
    expect(inputValue.value).not.toBe('11');
    expect(inputValue.value).toBe('12');
    userEvent.clear(inputDescription);
    userEvent.type(inputDescription, 'food');
    expect(inputDescription.value).not.toBe('lazer');
    expect(inputDescription.value).toBe('food');

    const saveEditedExpenseBtn = await screen.findByRole('button', { name: /editar despesa/i });
    expect(saveEditedExpenseBtn).toBeDefined();

    act(() => {
      userEvent.click(saveEditedExpenseBtn);
    });

    const newConvertedValue = await screen.findAllByText(/57\.04/i);
    expect(newConvertedValue[1]).toBeInTheDocument();
    const textDescription = await screen.findByText('food');
    expect(textDescription).toBeDefined();
    expect(fetch).toHaveBeenCalled();
  });
});
