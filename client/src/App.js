"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./App.css");
var ProductList_1 = __importDefault(require("./components/ProductList"));
var react_router_dom_1 = require("react-router-dom");
var Cart_1 = __importDefault(require("./components/Cart"));
var ProductPage_1 = __importDefault(require("./components/ProductPage"));
var Default_1 = __importDefault(require("./components/Default"));
var Register_1 = __importDefault(require("./components/Register"));
var Login_1 = __importDefault(require("./components/Login"));
var Navbar_1 = __importDefault(require("./components/Navbar"));
var Userpage_1 = __importDefault(require("./components/Userpage"));
var App = function () {
    return (<div className="App">
      <Navbar_1.default />
      <main>
      <react_router_dom_1.Switch>
              <react_router_dom_1.Route path="/" exact component={ProductList_1.default}/>
              <react_router_dom_1.Route path="/products/:id" component={ProductPage_1.default}/>
              <react_router_dom_1.Route path="/cart" component={Cart_1.default}/>
              <react_router_dom_1.Route path="/login" component={Login_1.default}/>
              <react_router_dom_1.Route path="/register" component={Register_1.default}/>
              <react_router_dom_1.Route path="/userpage" component={Userpage_1.default}/>
              <react_router_dom_1.Route component={Default_1.default}/>
        </react_router_dom_1.Switch>
      </main>
    </div>);
};
exports.default = App;
