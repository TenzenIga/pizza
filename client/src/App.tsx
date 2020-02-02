import React from 'react';
import './App.css';
import ProductList from './components/ProductList';
import { Switch, Route } from 'react-router-dom';
import Cart from './components/Cart';
import ProductPage from './components/ProductPage';
import Default from './components/Default';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Userpage from './components/Userpage';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <main>
      <Switch>
              <Route path="/" exact component={ProductList} />
              <Route path="/products/:id" component={ProductPage} />
              <Route path="/cart" component={Cart} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/userpage" component={Userpage} />
              <Route  component={Default} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
