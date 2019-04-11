import React, { Component } from 'react';
import './App.css';
import Ingredients from './components/Ingredients';
// import Order from './components/Order';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      Ingredients: [],
      Prices: [],
      TotalPrice: 0,
      Order: []
    }
    const Price = {
      Gin: 5,
      Vodka: 4,
      Rum: 3,
      Jenever: 6,
      Cola: 1,
      OrangeJuice: 1,
      Sprite: 1,
      AppleJuice: 1,
      IceTea: 1,
      SparklingWater: 1,
      Mint: 0.5,
      Cucumber: 0.5,
      Citron: 0.5,
      Orange: 0.5,
      Lavender: 0.5 
    }
    
    this.keys = Object.keys(Price);
    this.values = Object.values(Price);
  }
    addDrink=()=>{
      var order = [...this.state.Ingredients];
      var orderPrice = [...this.state.Prices];
      if(orderPrice.length > 0){
        var sum = orderPrice.reduce((partial_sum, a) => partial_sum + a);
        var orderDetail = [...this.state.Order]
        orderDetail.push({
            orderIngriendients: order,
            orderPrice: sum
          });
        
        this.setState(()=>({
          Ingredients: [],
          Prices: [],
          Order: orderDetail
        }));
      }
    };
     finishOrder = async () =>{
      await this.addDrink();
      let a = this.state.Order;
      let li;
      document.getElementById('ingredients').style.display = 'none';
      let list = document.getElementById('orderSummery');
      a.map((item, index) => (
        li = document.createElement("li"),
        li.innerHTML = ( "<li><h3>Drink "+(index+1)+" : </h3> <p>Ingredients: "+item.orderIngriendients+"</p><p>Price of drink: "+item.orderPrice+"</p></li>"),
        list.appendChild(li)
      ));
      
    }
    
    addThis=(event)=>{
      var array = [...this.state.Ingredients]; 
      array.push(event.target.dataset.tag);
      var pricearr = [...this.state.Prices];
      pricearr.push(parseFloat(event.target.dataset.price));
    
      // console.log(event.target.dataset.price);
      let price = parseFloat(event.target.dataset.price);
      this.setState((prevState)=>({
        TotalPrice: parseFloat(prevState.TotalPrice) + price,
        Ingredients: array,
        Prices: pricearr
      }));
    };
    subThis=(event)=>{
      var array = [...this.state.Ingredients]; // make a separate copy of the array
      var index = array.indexOf(event.target.dataset.tag);
      var pricearr = [...this.state.Prices];
      var priceIndex = pricearr.indexOf(parseFloat(event.target.dataset.price));
      if(index !== -1 && priceIndex !== -1){
        array.splice(index, 1);
        pricearr.splice(priceIndex, 1);
  
      let price = parseFloat(event.target.dataset.price);
      if(this.state.TotalPrice >= 0 ){
      this.setState((prevState)=>({
        Ingredients: array,
        Prices: pricearr,
        TotalPrice: parseFloat(prevState.TotalPrice) - price
      }));
    }
  }
    };
   
    


  render() {
    return (
      <div className="App">
      <h1>Prepare Your Drink</h1>
      <h3 id="price">Total Price : {this.state.TotalPrice}</h3>
      <ul id="ingredients">
       <Ingredients things={this.keys} prices={this.values} add={()=>this.addThis} sub={()=>this.subThis}/>
       </ul>
       
      <ul id='orderSummery'>
      
      </ul>

       <button onClick={()=> this.addDrink()}>Add Another Drink</button>
       <button onClick={ ()=> this.finishOrder()}>continue</button>
       <button onClick={()=>{
         console.log(this.state);
         }}>print</button>
      </div>
    );
  }
}

export default App;
