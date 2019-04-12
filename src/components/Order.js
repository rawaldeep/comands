import React from 'react';
const Order = (props) => {
      return props.bill.map((item, index) => (
        <div key={index} data-key={index}>
        <h3>Drink {(index+1)} : </h3> 
        <p>Ingredients: {item.orderIngriendients}</p>
        <p>Price of drink: {item.orderPrice}</p>
        <button onClick={()=> props.remover(index, item.orderPrice)} >I don't want this drink</button>
        </div>
    ));
    }
  
  
  export default Order;