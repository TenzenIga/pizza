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
var react_router_dom_1 = require("react-router-dom");
var userContext_1 = require("../context/userContext");
function Navbar() {
    var _a = react_1.useContext(userContext_1.UserContext), user = _a.user, isLoggedIn = _a.isLoggedIn;
    return (<nav className='navbar'>
        <div className='navbar-item main-menu'>
          <react_router_dom_1.Link to='/'>Pizza</react_router_dom_1.Link>  
        </div>
        <div className='navbar-item'>
          <react_router_dom_1.Link to="/cart">Cart</react_router_dom_1.Link>

         {isLoggedIn ? <react_router_dom_1.Link to="/userpage">{user.username}</react_router_dom_1.Link> : <react_router_dom_1.Link to="/login">Login</react_router_dom_1.Link>}
        </div>
      </nav>);
}
exports.default = Navbar;
