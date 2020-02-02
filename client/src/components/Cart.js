"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var cartContext_1 = require("../context/cartContext");
var CartItem_1 = __importDefault(require("./CartItem"));
var axios_1 = __importDefault(require("axios"));
var userContext_1 = require("../context/userContext");
//mock function for converting currency
function converToDollar(num) {
    return (num * 1.11).toFixed(2);
}
var saveOrders = function (cart, user) {
    var body = JSON.stringify(cart);
    axios_1.default.post('/orders', { body: body }, { headers: { 'x-auth-token': user.token } })
        .then(function (response) {
        console.log(response.data);
        alert('Orders saved!');
    }, function (error) {
        console.log(error);
    });
};
function Cart() {
    var _a = react_1.useContext(cartContext_1.CartContext), cart = _a.cart, decrement = _a.decrement, increment = _a.increment, deleteFromCart = _a.deleteFromCart;
    var user = react_1.useContext(userContext_1.UserContext).user;
    var deliveryCost = 20;
    var totalSum = cart.length && cart.reduce(function (acc, current) { return acc + (current.quantity * current.price); }, 0);
    var cartItemsList = cart.map(function (item) { return <CartItem_1.default key={item.id} item={item} decrement={decrement} increment={increment} deleteFromCart={deleteFromCart}/>; });
    return (<div className='cart'>
            <h3>Cart</h3>
            {cart.length ? (<>
                {cartItemsList}
            
                <h5>Order sum: {totalSum} €</h5>
                <h5>Delivery cost : {deliveryCost} €</h5>
                <h5>Total price with delivery: {totalSum + deliveryCost} €</h5>
                <h5>Total price in USA Dollar: {converToDollar(totalSum + deliveryCost)} $</h5>
                <button onClick={function () { return saveOrders(cart, user); }}>Buy</button>
                </>) : (<h5 className='cart-empty'>Cart is empty</h5>)}
        </div>);
}
exports.default = Cart;
