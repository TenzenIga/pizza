import * as React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";


type FormData = {
  name: string;
  email: string;
  password:string;
};


export default function Register() {
  const [error, setError] = useState('')
  const [redirect, setRedirect] = useState(false)
  const { register, handleSubmit, errors } = useForm<FormData>();
  const onSubmit = handleSubmit(({ name, email, password }) => {
    axios.post('/users', {username:name, email, password})
    .then((response) => {
        setRedirect(true)
    }, (error) => {
       setError(error.response.data);
    });  
});
if(redirect){
    return <Redirect to='/login' />
}
 return (
    
    <div className='form register-form'>
    <form onSubmit={onSubmit}>
    {error && <p className='error'>{error}</p>}
      <label>Username</label>
      <input name="name" ref={register({required:true})} />
      {errors.name && <p className='error'>First name is required</p>}
      <label>Email</label>
      <input name="email"  ref={register({pattern:/\S+@\S+\.\S+/})} />
      {errors.email && <p className='error'>First name is required</p>}
      <label>Password</label>
      <input name="password" type='password' ref={register} />
      <button
        type="submit"
      >
        Register
      </button>
    </form>
    </div>
  );
}

