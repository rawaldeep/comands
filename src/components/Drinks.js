import React, { Component } from 'react';

class Drinks extends Component {
    render() {
      return this.props.things.map((item, index) => (
        <li key={index} name={item}>
        <button data-tag={item} data-index={index} data-price={this.props.prices[index]} onClick={this.props.sub(item)}>-</button>
        <span>
            {item}
        </span>
        <button data-tag={item} data-price={this.props.prices[index]} onClick={this.props.add(item)}>+</button>
        </li>
    ));
    }
  }
  
  export default Drinks;