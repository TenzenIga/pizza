"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
exports.CartContext = react_1.createContext([]);
function CartProvider(props) {
    var _a = react_1.useState([]), cart = _a[0], setCart = _a[1];
    var addToCart = function (product) {
        var tempCart = __spreadArrays(cart);
        var selectedProduct = __assign(__assign({}, product), { quantity: 1 });
        var inCart = tempCart.find(function (item) { return item.id === product.id; });
        if (inCart) {
            increment(inCart);
        }
        else {
            setCart(__spreadArrays(tempCart, [selectedProduct]));
        }
    };
    var increment = function (product) {
        var tempCart = __spreadArrays(cart);
        var selectedProduct = __assign({}, product);
        var index = tempCart.indexOf(product);
        selectedProduct = tempCart[index];
        selectedProduct.quantity += 1;
        setCart(__spreadArrays(tempCart));
    };
    var decrement = function (product) {
        var tempCart = __spreadArrays(cart);
        var selectedProduct = __assign({}, product);
        var index = tempCart.indexOf(product);
        selectedProduct = tempCart[index];
        selectedProduct.quantity -= 1;
        if (selectedProduct.quantity === 0) {
            deleteFromCart(selectedProduct);
        }
        else {
            setCart(__spreadArrays(tempCart));
        }
    };
    var deleteFromCart = function (product) {
        var newCart = cart.filter(function (item) { return product.id !== item.id; });
        setCart(__spreadArrays(newCart));
    };
    return <exports.CartContext.Provider value={{ cart: cart, addToCart: addToCart, decrement: decrement, increment: increment, deleteFromCart: deleteFromCart }}>
        {props.children}
    </exports.CartContext.Provider>;
}
exports.CartProvider = CartProvider;
