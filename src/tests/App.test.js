import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { App } from '../App';

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
