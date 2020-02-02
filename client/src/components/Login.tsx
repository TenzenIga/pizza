import * as React from "react";
import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { UserContext } from "../context/userContext";
type FormData = {
  email: string;
  password:string;
};


export default function Register() {
  const {auth} = useContext(UserContext);
  const [error, setError] = useState('')
  const { register,  handleSubmit, errors } = useForm<FormData>();
  const onSubmit = handleSubmit(({ email, password }) => {
    axios.post('/auth', { email, password}
     )
     .then(response => {
         auth(response.data)
     }, (error) => {
        setError(error.response.data);
  });
  })
  
  return (
    <div className='form login-form'>
    <form onSubmit={onSubmit}>
    {error && <p className='error'>{error}</p>}
      <label>Email</label>
      <input name="email"  ref={register({required:true})} />
      {errors.email && <p className='error'>email is required</p>}
      <label>Password</label>
      <input name="password" type='password' ref={register} />
      <button
        type="submit"
      >
        Login
      </button>
    <p>Don't have an account? <Link to='/register'>Register</Link></p>
    </form>
    </div>
  );
}
