import * as React from "react";
import { useForm } from "react-hook-form";
import { Link, Redirect } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";
import { loadUser } from "../store/user/actions";
import { IStore, IUser } from "../interface/interface";
import { connect } from "react-redux";
import { Form, Button, Alert } from "react-bootstrap";

type FormData = {
  email: string;
  password:string;
};

type userProps = {
  user:IUser
  loadUser:Function
};

function Login(props:userProps) {
  const {loadUser, user} = props;

  const { register,  handleSubmit } = useForm<FormData>();
  const onSubmit = handleSubmit(({email, password})=>{
      loadUser({email, password})
  })
  if(user.isLoggedIn){
    return <Redirect to='/userpage' />
  }
  
  
  return (
    <Form  onSubmit={onSubmit} >
       {user.error && 
     <Alert variant='danger'>
     {user.error}
     </Alert>}
  <Form.Group controlId="email">
    <Form.Label>Email address</Form.Label>
    <Form.Control name='email' type="email" placeholder="Enter email" ref={register} />
  </Form.Group>

  <Form.Group controlId="password">
    <Form.Label>Password</Form.Label>
    <Form.Control name='password' type="password" ref={register} placeholder="Password" />
  </Form.Group>
  <Button variant="primary" type="submit">
  Login
  </Button>
  <Form.Text className="text-muted">
      Don't have an account? <Link to='/register'>Register</Link>
    </Form.Text>
</Form>
  );
}



const mapStateToProps = (state:IStore) =>({
  user:state.user
});
const mapDispatchToProps = (dispatch:Dispatch) => {
  return{
      loadUser:bindActionCreators(loadUser, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);