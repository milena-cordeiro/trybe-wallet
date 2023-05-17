// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_STARTED,
  REQUEST_SUCCESSFUL,
  ADD_EXPENSES, REMOVE_EXPENSE, EDIT_EXPENSE, SAVE_EDIT_EXPENSE } from '../actions';
// import { ADD_EXPENSES } from '../actions/walletActions';

const INITIAL_STATE_WALLET = {
  isLoading: false,
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

function walletReducer(state = INITIAL_STATE_WALLET, action) {
  switch (action.type) {
  case REQUEST_STARTED:
    return {
      ...state,
      isLoading: true,
    };

  case REQUEST_SUCCESSFUL:

    return {
      ...state,
      isLoading: false,
      currencies: [...action.data],
    };

  case ADD_EXPENSES:

    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };

  case REMOVE_EXPENSE:

    return {
      ...state,
      expenses: [...action.newExpenses],
    };

  case EDIT_EXPENSE:

    return {
      ...state,
      idToEdit: action.id,
      editor: true,
    };

  case SAVE_EDIT_EXPENSE:

    return {
      ...state,
      expenses: state.expenses
        .map((expense) => (expense.id === action.editedExpense.id
          ? (action.editedExpense) : (expense))),
      editor: false,
    };

  default:
    return state;
  }
}

export default walletReducer;
