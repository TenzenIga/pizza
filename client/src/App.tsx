import React, { useEffect } from 'react';
import './App.css';
import ProductList from './components/ProductList';
import { Switch, Route } from 'react-router-dom';
import Cart from './components/Cart';
import ProductPage from './components/ProductPage';
import Default from './components/Default';
import Register from './components/Register';
import Login from './components/Login';
import Navigation from './components/Navigation';
import Userpage from './components/Userpage';
import { loadProducts } from './store/products/actions';
import { IStore, ICart, ProductsState } from './interface/interface';
import { bindActionCreators, Dispatch } from 'redux';
import { addToCart, increment } from './store/cart/actions';
import { connect } from 'react-redux';
import { loadUser } from './store/user/actions';
import { Container } from 'react-bootstrap';

type AppProps = {
  products:ProductsState,
  cart:ICart[],
  loadProducts:Function,
  addToCart:Function,
  increment:Function,
  loadUser:Function
}

const App = (props:AppProps) => {
  const {products, cart,addToCart, loadProducts, increment} = props
  useEffect( ()=>{
    loadProducts()
  },[])
    
  return (
    <div className="App">
      <Navigation />
      <Container>
      <Switch>
              <Route path="/" exact render={(props) => < ProductList {...props} products={products.products} cart={cart} addToCart={addToCart} increment={increment}  /> } />
              <Route path="/products/:id" component={ProductPage} />
              <Route path="/cart" component={Cart} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/userpage" component={Userpage} />
              <Route  component={Default} />
        </Switch>
      </Container>
    </div>
  );
}


const mapStateToProps = (state:IStore) =>({
  products:state.products,
  cart:state.cart
});

const mapDispatchToProps = (dispatch:Dispatch) => {
  return{
      loadProducts:bindActionCreators(loadProducts, dispatch),
      addToCart:bindActionCreators(addToCart, dispatch),
      increment:bindActionCreators(increment, dispatch),
      loadUser:bindActionCreators(loadUser, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
