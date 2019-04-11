import React, { Component } from 'react';

class Order extends Component {
  //  a = this.props.ordersummery;
  //  console.log(this.props.ordersummery);
  props.ordersummery.map((a, i) => (
    console.log(a)
  ));
    render() {
      return (
        this.props.ordersummery.map((item, index) => (
        <li key={index}>{item.orderIngriendients[index]} </li>
        ))
        );
    }
}
  
  export default Order;