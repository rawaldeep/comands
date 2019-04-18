import React from 'react';

const Drinks = (props) => {
      return props.things.map((item, index) => (
        <li key={index} name={item}>
        <button className="waves-effect waves-teal btn-floating red" data-tag={item} data-index={index} data-price={props.prices[index]} onClick={props.sub(item)}>
        <i className="material-icons">remove</i>
        </button>
        <span>
            {item}
        </span>
        <button className="waves-effect waves-teal btn-floating red" data-tag={item} data-price={props.prices[index]} onClick={props.add(item)}>
        <i className="material-icons materialpointer">add</i>
        </button>
        </li>
    ));
    
  }
  
  export default Drinks;