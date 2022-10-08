export const getRate = () =>
  fetch(
    'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11'
  ).then(response => response.json());
