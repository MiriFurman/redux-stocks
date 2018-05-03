import {join} from 'lodash/fp';

const uri = 'https://kickstart-stocks-server.now.sh';
const searchUri = keyword => `${uri}/stocks/search/${keyword}`;
const symbolsUri = symbols => `${uri}/stocks/symbols/${join(',', symbols)}`;

const toJson = res => res.json();

const stocksAPI = ({
  getStockBySymbols: symbols =>
    fetch(symbolsUri(symbols), {mode: 'cors'})
      .then(toJson),
  searchStocks: keyword =>
    fetch(searchUri(keyword), {mode: 'cors'})
      .then(toJson)
});

export default stocksAPI;
