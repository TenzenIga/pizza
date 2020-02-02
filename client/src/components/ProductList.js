"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var productContext_1 = require("../context/productContext");
var react_router_dom_1 = require("react-router-dom");
var cartContext_1 = require("../context/cartContext");
function ProductList() {
    var products = react_1.useContext(productContext_1.ProductContext).products;
    var addToCart = react_1.useContext(cartContext_1.CartContext).addToCart;
    var list = products.map(function (p) {
        return (<div key={p.id} className='product'>
            <react_router_dom_1.Link to={"/products/" + p.id}><img src={'/img/' + p.img} className='product__img' alt=""/></react_router_dom_1.Link>
            <div className='product__info'> 
            <h3 className='product__name'>{p.name}</h3>
            <h4 className='product__price'>{p.price} €</h4>
            <button className='product__btn' onClick={function () { return addToCart(p); }}>Order</button>
            </div>
        </div>);
    });
    return (<div className='product-list'>
            {list}
        </div>);
}
exports.default = ProductList;
