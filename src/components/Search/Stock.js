import React from 'react';

const Stock = ({stock}) =>
  <tr>
    <td>
      <button className="btn btn-success" onClick={() => addToFavrites(stock.symbol)}>
        <span className="glyphicon glyphicon-plus-sign"/>
      </button>
    </td>
    <td>
      {stock.symbol}
    </td>
    <td>
      {stock.name}
    </td>
    <td>
      {stock.price}
    </td>
    <td>
      {stock.change}
    </td>
  </tr>;

export default Stock;
