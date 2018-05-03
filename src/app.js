import 'babel-polyfill';
import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import {I18nextProvider} from 'react-i18next';
import {wixAxiosConfig} from 'wix-axios-config';
import {App, NETWORK_READY, NETWORK_IN_PROGRESS, VIEW_SEARCH, VIEW_FAVORITES} from './components/App/App';
import i18n from './i18n';
import { createStore, compose, applyMiddleware } from 'redux';
import stocks from './components/stocks/stocks';
import {Provider, connect} from 'react-redux';
import thunk from 'redux-thunk';
import {debounce} from 'lodash';

const baseUrl = window.__BASEURL__;
const locale = window.__LOCALE__;
const staticsBaseUrl = window.__STATICS_BASE_URL__;

wixAxiosConfig(axios, {baseURL: baseUrl});

const TERM_CHANGED = 'TERM_CHANGED';
const SET_STOCKS = 'SET_STOCKS';
const START_REMOTE_CALL = 'START_REMOTE_CALL';
const END_REMOTE_CALL = 'END_REMOTE_CALL';
const VIEW_SEARCH_TAB = 'VIEW_SEARCH_TAB';
const VIEW_FAVORITES_TAB = 'VIEW_FAVORITES_TAB';

const initialState = {term: '', stocks: [], networkStatus: NETWORK_READY, view: VIEW_SEARCH};


function setTerm(text) {
  return {
    type: TERM_CHANGED,
    payload: text
  }
}

function setStocks(stockList) {
  return {
    type: SET_STOCKS,
    payload: stockList
  }
}

function startRemoteCall() {
  return {
    type: START_REMOTE_CALL,
    payload: NETWORK_IN_PROGRESS
  }
}

function endRemoteCall() {
  return {
    type: END_REMOTE_CALL,
    payload: NETWORK_READY
  }
}

function viewSearch() {
  return {
    type: VIEW_SEARCH_TAB,
    payload: VIEW_SEARCH
  }
}

function viewFavorites() {
  return {
    type: VIEW_FAVORITES_TAB,
    payload: VIEW_FAVORITES
  }
}

const search = () => () => {
  const term = store.getState().term;
  if (term === '') {
    store.dispatch(setStocks([]));
  } else {
    store.dispatch(startRemoteCall());
    stocks.searchStocks(term).then(stocks => {
      store.dispatch(setStocks(stocks));
      store.dispatch(endRemoteCall());
    });
  }
};

// termReducer
// newtworkReducer
// stocksReducer = (state = [], action) => {
//
// }


function reducer(state = initialState, action) {
  switch (action.type) {
    case TERM_CHANGED:
      return {...state, term: action.payload};
    case SET_STOCKS:
      return {...state, stocks: action.payload};
    case START_REMOTE_CALL:
      return {...state, networkStatus: action.payload};
    case END_REMOTE_CALL:
      return {...state, networkStatus: action.payload};
    case VIEW_SEARCH_TAB:
      return {...state, view: action.payload};
    case VIEW_FAVORITES_TAB:
      return {...state, view: action.payload};
    default:
      return state;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk)
));

const mapStateToProps = state => ({
  term: state.term,
  stocks: state.stocks,
  networkStatus: state.networkStatus
});

const mapDispatchToProps = dispatch => ({
  termChangedHandler: debounce((text) => {
    dispatch(setTerm(text));
    dispatch(search());
  }, 500),
  setStocksHandler: (stocklist) => dispatch(setStocks(stocklist))
});

const MyApp = connect(mapStateToProps, mapDispatchToProps)(App);

store.subscribe(() => {
  const state = store.getState();
});


ReactDOM.render(
  <Provider store={store}>
    <MyApp/>
  </Provider>,
  document.getElementById('root')
);

setInterval(search(), 3000);

