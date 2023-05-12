// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_STARTED, REQUEST_SUCCESSFUL } from '../actions';

const INITIAL_STATE_WALLET = {
  isLoading: false,
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const walletReducer = (state = INITIAL_STATE_WALLET, action) => {
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

  default:
    return state;
  }
};

export default walletReducer;
