import React, { Component } from 'react';
import './App.css';
import Drinks from './components/Drinks';
import Order from './components/Order';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      Ingredients: [],
      Prices: [],
      TotalPrice: 0,
      Order: []
    }
    const Spirits = {
      Gin: 5,
      Vodka: 4,
      Rum: 3,
      Jenever: 6,
    }
    const SoftDrinks = {
      Cola: 1,
      OrangeJuice: 1,
      Sprite: 1,
      AppleJuice: 1,
      IceTea: 1,
      SparklingWater: 1
    }
    const Garnishes = {
      Mint: 0.5,
      Cucumber: 0.5,
      Citron: 0.5,
      Orange: 0.5,
      Lavender: 0.5 
    }
    
    this.Spiritskeys = Object.keys(Spirits);
    this.SpiritsValues = Object.values(Spirits);
    this.SoftDrinkKeys = Object.keys(SoftDrinks);
    this.SoftDrinkValues = Object.values(SoftDrinks);
    this.GarnishesKeys = Object.keys(Garnishes);
    this.GarnishesValues = Object.values(Garnishes);
  }
    addDrink=()=>{
      let order = [...this.state.Ingredients];
      let orderPrice = [...this.state.Prices];
      if(orderPrice.length > 0){
        let sum = orderPrice.reduce((partial_sum, a) => partial_sum + a);
        let orderDetail = [...this.state.Order]
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
      let goback = document.getElementById("ingredients").style.display;
      if(goback === 'none'){
        document.getElementById("ingredients").style.display = "flex";
        document.getElementById("orderSummery").innerHTML = '';
      }

    };
     finishOrder = async () =>{
      await this.addDrink();
      document.getElementById('ingredients').style.display = 'none';
    }
    removeItem = (event, price) =>{
      let value = event;
      let a = this.state.Order;
      a.splice(value, 1);
      this.setState(()=>({
      TotalPrice: this.state.TotalPrice - price
    }))
    }

    addThis=(event)=>{
      let array = [...this.state.Ingredients]; 
      array.push(event.target.dataset.tag);
      let pricearr = [...this.state.Prices];
      pricearr.push(parseFloat(event.target.dataset.price));
      let price = parseFloat(event.target.dataset.price);
      this.setState((prevState)=>({
        TotalPrice: parseFloat(prevState.TotalPrice) + price,
        Ingredients: array,
        Prices: pricearr
      }));
    };
    subThis=(event)=>{
      let array = [...this.state.Ingredients]; // make a separate copy of the array
      let index = array.indexOf(event.target.dataset.tag);
      let pricearr = [...this.state.Prices];
      let priceIndex = pricearr.indexOf(parseFloat(event.target.dataset.price));
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
    clearOrder = () =>{
      this.setState(()=>({
        Ingredients: [],
        Prices: [],
        TotalPrice: 0,
        Order: []
      }))
      document.getElementById('ingredients').style.display = 'flex';
    }
   
  render() {
    return (
      <div className="App">
      <h1>Prepare Your Drink</h1>
      <h3 id="price">Total Price : {this.state.TotalPrice}</h3>
      <div className="reciept">
      <Order bill={this.state.Order} remover={this.removeItem}/>
      </div>
      <div className="addOrder">
      <ul id="ingredients">
      <ul>
      <h3>Add Spirits</h3>
      <Drinks things={this.Spiritskeys} prices={this.SpiritsValues} add={()=>this.addThis} sub={()=>this.subThis}/>
      </ul>
       <ul>
       <h3>Add SoftDrinks</h3>
       <Drinks things={this.SoftDrinkKeys} prices={this.SoftDrinkValues} add={()=>this.addThis} sub={()=>this.subThis}/>
       </ul>
       <ul>
         <h3>Add Garnishes</h3>
       <Drinks things={this.GarnishesKeys} prices={this.GarnishesValues} add={()=>this.addThis} sub={()=>this.subThis}/>
       </ul>
       </ul>
      </div> 
       <button onClick={()=> this.addDrink()}>Add Another Drink</button>
       <button onClick={ ()=> this.finishOrder()}>continue</button>
       <button onClick={ ()=> this.clearOrder()}>I don't want it</button>
      </div>
    );
  }
}

export default App;
