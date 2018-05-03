import React from 'react'

const Stock = ({ stock, removeFromFavorites }) =>
  <tr>
    <td>
      <button className="btn btn-danger" onClick={() => removeFromFavorites(stock.symbol)}>
        <span className="glyphicon glyphicon-minus-sign" aria-hidden="true"/>
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