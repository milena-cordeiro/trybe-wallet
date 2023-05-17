// import requestExchangeRates from '../../helpers/request';

// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const SAVE_EDIT_EXPENSE = 'SAVE_EDIT_EXPENSE';
export const EXCHANGE_RATES = 'EXCHANGE_RATES';
export const REQUEST_STARTED = 'REQUEST_STARTED';
export const REQUEST_SUCCESSFUL = 'REQUEST_SUCCESSFUL';
export const REMOVE_EXPENSE = ' REMOVE_EXPENSE ';
// export const REQUEST_FAILURE = 'REQUEST_FAILURE';

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  email,
});

const requestStarted = () => ({
  type: REQUEST_STARTED,
});

const requestSuccesful = (data) => ({
  type: REQUEST_SUCCESSFUL,
  data,
});

export const addExpenses = (expense) => ({
  type: ADD_EXPENSES,
  expense,
});

export const removeExpense = (newExpenses) => ({
  type: REMOVE_EXPENSE,
  newExpenses,
});

export const editExpense = (id) => ({
  type: EDIT_EXPENSE,
  id,
});

export const saveEditExpense = (editedExpense) => ({
  type: SAVE_EDIT_EXPENSE,
  editedExpense,
});

const API_URL = 'https://economia.awesomeapi.com.br/json/all';

export const fetchAction = () => async (dispatch) => {
  dispatch(requestStarted());
  const response = await fetch(API_URL);
  const data = await response.json();
  // console.log(data);
  const newData = Object.keys(data);
  newData.splice(1, 1);
  // console.log(newData);
  dispatch(requestSuccesful(newData));
};

export const requestExchangeRates = (expense) => async (dispatch) => {
  const response = await fetch(API_URL);
  const data = await response.json();
  dispatch(addExpenses({ ...expense, exchangeRates: data }));
};

export const requestExchangeRatesEdited = (expense) => async (dispatch) => {
  const response = await fetch(API_URL);
  const data = await response.json();
  dispatch(saveEditExpense({ ...expense, exchangeRates: data }));
};
