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
var axios_1 = __importDefault(require("axios"));
var react_router_dom_1 = require("react-router-dom");
function Register() {
    var _a = react_1.useState(''), error = _a[0], setError = _a[1];
    var _b = react_1.useState(false), redirect = _b[0], setRedirect = _b[1];
    var _c = react_hook_form_1.useForm(), register = _c.register, handleSubmit = _c.handleSubmit, errors = _c.errors;
    var onSubmit = handleSubmit(function (_a) {
        var name = _a.name, email = _a.email, password = _a.password;
        axios_1.default.post('/users', { username: name, email: email, password: password })
            .then(function (response) {
            setRedirect(true);
        }, function (error) {
            setError(error.response.data);
        });
    });
    if (redirect) {
        return <react_router_dom_1.Redirect to='/login'/>;
    }
    return (<div className='form register-form'>
    <form onSubmit={onSubmit}>
    {error && <p className='error'>{error}</p>}
      <label>Username</label>
      <input name="name" ref={register({ required: true })}/>
      {errors.name && <p className='error'>First name is required</p>}
      <label>Email</label>
      <input name="email" ref={register({ pattern: /\S+@\S+\.\S+/ })}/>
      {errors.email && <p className='error'>First name is required</p>}
      <label>Password</label>
      <input name="password" type='password' ref={register}/>
      <button type="submit">
        Register
      </button>
    </form>
    </div>);
}
exports.default = Register;
