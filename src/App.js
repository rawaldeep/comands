import React, { Component } from 'react';
import './App.css';
import Spirits from './components/Spirits';
import SoftDrinks from './components/SoftDrinks';
import Garnishes from './components/Garnishes';

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
        document.getElementById("ingredients").style.display = "block";
        document.getElementById("orderSummery").innerHTML = '';
      }

    };
     finishOrder = async () =>{
      await this.addDrink();
      let a = this.state.Order;
      let li;
      let btn;
      document.getElementById('ingredients').style.display = 'none';
      let list = document.getElementById('orderSummery');
      a.map((item, index) => (
        li = document.createElement("li"),
        btn = document.createElement("button"),
        btn.innerHTML = "I don't want this drink",
        li.setAttribute('data-key', index),
        btn.setAttribute('index', index),
        li.innerHTML = ( `<h3>Drink ${(index+1)} : </h3> <p>Ingredients: ${item.orderIngriendients}</p><p>Price of drink: ${item.orderPrice}</p>`),
        li.appendChild(btn),
        list.appendChild(li),

        btn.onclick = (event) => {
          // this is the delete button that will delete the individual order
          let value = event.target.index;
          a.splice(value, 1);
          this.setState(()=>({
            TotalPrice: this.state.TotalPrice - item.orderPrice
          }))
          let target = document.body.querySelector(`li[data-key='${index}']`);
          target.remove();// you gotta have faith in simple sounding functions
        }

      ));
      
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
      document.getElementById('ingredients').style.display = 'block';
      document.getElementById('orderSummery').innerHTML = '';
    }
   
  render() {
    return (
      <div className="App">
      <h1>Prepare Your Drink</h1>
      <h3 id="price">Total Price : {this.state.TotalPrice}</h3>
      <ul id="ingredients">
      <ul>
      <h3>Add Spirits</h3>
      <Spirits things={this.Spiritskeys} prices={this.SpiritsValues} add={()=>this.addThis} sub={()=>this.subThis}/>
      </ul>
       <ul>
       <h3>Add SoftDrinks</h3>
       <SoftDrinks things={this.SoftDrinkKeys} prices={this.SoftDrinkValues} add={()=>this.addThis} sub={()=>this.subThis}/>
       </ul>
       <ul>
         <h3>Add Garnishes</h3>
       <Garnishes things={this.GarnishesKeys} prices={this.GarnishesValues} add={()=>this.addThis} sub={()=>this.subThis}/>
       </ul>
       </ul>
      <ul id='orderSummery'></ul>
       <button onClick={()=> this.addDrink()}>Add Another Drink</button>
       <button onClick={ ()=> this.finishOrder()}>continue</button>
       <button onClick={ ()=> this.clearOrder()}>I don't want it</button>
       <button onClick={()=>{
         console.log(this.state);
         }}>print</button>
      </div>
    );
  }
}

export default App;
