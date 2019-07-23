
import React, { Component } from "react";


class StockInfo extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (<>
      <table>
        <tbody>
          {this.props.info.map((event, index) => <tr key={index}><td><p>{capitalFirst(event)}</p></td></tr>)}
        </tbody>
      </table>
    </>)
  }
}

function capitalFirst(paragraph) {
  debugger;
  let firstWord = paragraph[0].split(' ')[0];
  return firstWord.charAt(0).toUpperCase() + paragraph[0].slice(1);
}


export { StockInfo };