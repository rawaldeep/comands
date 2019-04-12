import React from 'react';
const Order = (props) => {
      return props.bill.map((item, index) => (
        <div className="col s4" key={index} data-key={index}>
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">Drink {(index+1)} : </span>
              <p>Ingredients:<br/> {item.orderIngriendients.join(", ")}</p>
            <p>Price of drink:<br/>  €{item.orderPrice}</p>
            </div>
            <div className="card-action">
              <a onClick={()=> props.remover(index, item.orderPrice)} >I don't want this drink</a>
            </div>
          </div>
        </div>
    ));
    }
  export default Order;