import * as React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";


type FormData = {
  name: string;
  email: string;
  password:string;
};


export default function Register() {
  const [error, setError] = useState('')
  const [redirect, setRedirect] = useState(false)
  const { register, handleSubmit } = useForm<FormData>();
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
  <Form  onSubmit={onSubmit} >
    {error && 
     <Alert variant='danger'>
     {error}
     </Alert>}
    <Form.Group controlId="name">
    <Form.Label>Username</Form.Label>
    <Form.Control name='name' type="Username" placeholder="Enter Username" ref={register} />
  </Form.Group>
  <Form.Group controlId="email">
    <Form.Label>Email address</Form.Label>
    <Form.Control name='email' type="email" placeholder="Enter email" ref={register} />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>
  <Form.Group controlId="password">
    <Form.Label>Password</Form.Label>
    <Form.Control name='password' type="password" ref={register} placeholder="Password" />
  </Form.Group>
  <Button variant="primary" type="submit">
  Register
  </Button>
</Form>

  );
}

