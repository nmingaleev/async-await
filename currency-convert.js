// USD CAD 23
//

const axios = require('axios');

const getExchangeRate = async (from, to) => {
  try {
    const response = await axios.get(`http://api.fixer.io/latest?base=${from}`);
    const rate = response.data.rates[to];

    if (rate) {
      return rate;
    } else {
      throw new Error();
    }
  } catch (e) {
    throw new Error (`Unable to get exchange rate for ${from} and ${to}.`)
  }
};

const getCountries = async (currencyCode) => {
 try {
   const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
   return response.data.map((country) => {   //возвращает массив с именами стран
       return country.name;
     });
 } catch (e) {
   throw new Error (`Unable to get countries that use ${currencyCode}`);
 }
};

const convertCurrency = (from, to, amount) => {
  let countries;
  return getCountries(to).then((tempCountries) => {
    countries = tempCountries;
    return getExchangeRate(from,to);
  }).then((rate) => {
    const exchangedAmount = amount * rate;

    return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`;
  });
};

const convertCurrencyAlt = async (from, to, amount) => {
  const rate = await getExchangeRate(from, to);
  const countries = await getCountries(to);
  const exchangedAmount = amount * rate;

  return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`;
};

convertCurrencyAlt('USD', 'RUB', 1000000).then((status) => {
  console.log(status);
}).catch((e) => {
  console.log(e.message);
});
