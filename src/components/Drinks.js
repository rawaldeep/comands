import React from 'react';

const Drinks = (props) => {
      return props.things.map((item, index) => (
        <li key={index} name={item}>
        <button className="waves-effect waves-teal btn-flat red" data-tag={item} data-index={index} data-price={props.prices[index]} onClick={props.sub(item)}>-</button>
        <span>
            {item}
        </span>
        <button className="waves-effect waves-teal btn-flat red" data-tag={item} data-price={props.prices[index]} onClick={props.add(item)}>
        +
        </button>
        </li>
    ));
    
  }
  
  export default Drinks;