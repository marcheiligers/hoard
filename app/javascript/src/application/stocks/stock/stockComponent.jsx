import React from "react";
const Stock = ({ symbol, name, annualDividends, heart, star, url }) => (
  <div>
    <h1>Stock</h1>
    <ul>
      <li>symbol: {symbol}</li>
      <li>name: {name ? name : <em>None</em>}</li>
      <li>
        annualDividends: {annualDividends ? annualDividends : <em>None</em>}
      </li>
      <li>heart: {heart ? heart : <em>None</em>}</li>
      <li>star: {star ? star : <em>None</em>}</li>
      <li>url: {url ? url : <em>None</em>}</li>
    </ul>
  </div>
);
export default Stock;
