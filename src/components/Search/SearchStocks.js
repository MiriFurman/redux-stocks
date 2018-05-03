/**
 * Created by mirif on 13/08/2017.
 */
import React from 'react';
import { map } from 'lodash/fp';
import Stock from './Stock';

export class SearchStocks extends Component {

  constructor() {
    super();
  }

  render() {
    return (
    <div>
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
                    <th>Add Favorite</th>
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

