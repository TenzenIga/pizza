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
var React = __importStar(require("react"));
var react_hook_form_1 = require("react-hook-form");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var axios_1 = __importDefault(require("axios"));
var userContext_1 = require("../context/userContext");
function Register() {
    var auth = react_1.useContext(userContext_1.UserContext).auth;
    var _a = react_1.useState(''), error = _a[0], setError = _a[1];
    var _b = react_hook_form_1.useForm(), register = _b.register, handleSubmit = _b.handleSubmit, errors = _b.errors;
    var onSubmit = handleSubmit(function (_a) {
        var email = _a.email, password = _a.password;
        axios_1.default.post('/auth', { email: email, password: password })
            .then(function (response) {
            auth(response.data);
        }, function (error) {
            setError(error.response.data);
        });
    });
    return (<div className='form login-form'>
    <form onSubmit={onSubmit}>
    {error && <p className='error'>{error}</p>}
      <label>Email</label>
      <input name="email" ref={register({ required: true })}/>
      {errors.email && <p className='error'>email is required</p>}
      <label>Password</label>
      <input name="password" type='password' ref={register}/>
      <button type="submit">
        Login
      </button>
    <p>Don't have an account? <react_router_dom_1.Link to='/register'>Register</react_router_dom_1.Link></p>
    </form>
    </div>);
}
exports.default = Register;
