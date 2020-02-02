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
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.UserContext = react_1.createContext({});
function UserProvider(props) {
    var _a = react_1.useState(false), isLoggedIn = _a[0], setLogging = _a[1];
    var _b = react_1.useState({}), user = _b[0], setUser = _b[1];
    var auth = function (token) {
        var decoded = jsonwebtoken_1.default.verify(token, 'pizza');
        setLogging(true);
        setUser({ uid: decoded.uid, username: decoded.username, token: token });
    };
    return <exports.UserContext.Provider value={{ auth: auth, isLoggedIn: isLoggedIn, user: user }}>
        {props.children}
    </exports.UserContext.Provider>;
}
exports.UserProvider = UserProvider;
