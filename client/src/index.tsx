import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ProductsProvider } from './context/productContext';
import {BrowserRouter as Router  } from "react-router-dom";
import { CartProvider } from './context/cartContext';
import { UserProvider } from './context/userContext';
ReactDOM.render(<ProductsProvider>
        <CartProvider>
            <UserProvider>
                <Router>
                    <App />
                </Router>
            </UserProvider>
        </CartProvider>
    </ProductsProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
