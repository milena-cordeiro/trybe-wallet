// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';
export const REQUEST_STARTED = 'REQUEST_STARTED';
export const REQUEST_SUCCESSFUL = 'REQUEST_SUCCESSFUL';
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

const API_URL = 'https://economia.awesomeapi.com.br/json/all';

export const fetchAction = () => async (dispatch) => {
  dispatch(requestStarted());
  const response = await fetch(API_URL);
  const data = await response.json();
  const newData = Object.keys(data);
  newData.splice(1, 1);
  // console.log(newData);
  dispatch(requestSuccesful(newData));
};
