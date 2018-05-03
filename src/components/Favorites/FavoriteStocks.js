/**
 * Created by mirif on 13/08/2017.
 */
import React from 'react';
import { map } from 'lodash/fp';
import Stock from './Stock';

export class FavoriteStocks extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div>
        stocks.length > 0
        ?
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Remove Favorite</th>
              <th>Symbol</th>
              <th>Name</th>
              <th>Price</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            {
              map(stock => <Stock key={stock.symbol} stock={stock} removeFromFavorites={removeFromFavorites}/>, stocks)
            }
          </tbody>
        </table>
        :
        <span>Search for a stock...</span>
      </div>
    );
  }
}

