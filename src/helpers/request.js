const API_URL = 'https://economia.awesomeapi.com.br/json/all';

const requestExchangeRates = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  // console.log(data);
  return data;
};

export default requestExchangeRates;
