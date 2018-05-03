import React, {Component} from 'react';
import {translate} from 'react-i18next';
import PropTypes from 'prop-types';
import s from './App.scss';
import {map} from 'lodash/fp';
import Stock from '../Search/Stock';
import Indicator from './Indicator';

export const NETWORK_IN_PROGRESS = 'NETWORK_IN_PROGRESS';
export const NETWORK_READY = 'NETWORK_READY';

export const VIEW_SEARCH = 'search'
export const VIEW_FAVORITES = 'favorites'

export class App extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>Kickstart Stocks <Indicator on={this.props.networkStatus === NETWORK_IN_PROGRESS}/></h1>
          </div>
        </div>
        <div className="row">
        </div>
        <div className="row">
        </div>

        <div className="row">
          <div className="col-md-12">
            <input onChange={e => {this.props.termChangedHandler(e.target.value)}}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {
              this.props.stocks.length > 0
                ?
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Symbol</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      map(stock => <Stock key={stock.symbol} stock={stock} searchTerm={this.props.term} />, this.props.stocks)
                    }
                  </tbody>
                </table>
                :
                <span>Search for a stock...</span>
            }
          </div>
        </div>

      </div>
    );
  }
}

