import React from 'react';
const Order = (props) => {
      return props.bill.map((item, index) => (
        <div className="col s4" key={index} data-key={index}>
          <div className="card blue-grey darken-1 card-panel hoverable">
            <div className="card-content white-text">
              <span className="card-title">Drink {(index+1)} : </span>
              <p>Ingredients: {item.orderIngriendients.join(", ")}</p>
              <p>Price of drink: €{item.orderPrice}</p>
            </div>
            <div className="card-action">
              <a className="card-link" onClick={()=> props.remover(index, item.orderPrice)} >I don't want this drink</a>
            </div>
          </div>
        </div>
    ));
    }
  export default Order;