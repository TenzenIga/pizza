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
var axios_1 = __importDefault(require("axios"));
var userContext_1 = require("../context/userContext");
function Userpage() {
    var user = react_1.useContext(userContext_1.UserContext).user;
    var _a = react_1.useState(), orders = _a[0], setOrders = _a[1];
    react_1.useEffect(function () {
        axios_1.default.get('/orders', { headers: { 'x-auth-token': user.token } })
            .then(function (response) { return setOrders(response.data); });
    }, []);
    var ordersList = orders && orders.map(function (key, element) { return <p key={key}>{element.body}</p>; });
    return (<div>
            <h2>Orders history</h2>
            {ordersList}
        </div>);
}
exports.default = Userpage;
