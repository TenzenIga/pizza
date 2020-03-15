import React from 'react';
import { IUser, IStore } from '../interface/interface';
import { connect } from 'react-redux';
import {Navbar, Nav} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart,faUser,faPizzaSlice } from '@fortawesome/free-solid-svg-icons'
import { LinkContainer } from 'react-router-bootstrap';
import { logOut } from '../store/user/actions';
import { Dispatch, bindActionCreators } from 'redux';

type navbarProps = {
  user:IUser,
  logOut:Function
};

 function Navigation(props:navbarProps) {
    const {user, logOut} = props
    
    const handleLogout = ()=>{
      localStorage.clear();
      logOut();
    }
    return (
        <Navbar bg="primary" variant="dark">
          <LinkContainer to='/'>
          <Navbar.Brand>
          <FontAwesomeIcon className='mr-1' icon={faPizzaSlice} />
          Pizza 
          </Navbar.Brand>
          </LinkContainer>
          <Nav className='ml-auto'>
          <LinkContainer to='/cart'>
            <Nav.Link>
              <FontAwesomeIcon icon={faShoppingCart} />
            </Nav.Link>
          </LinkContainer>
         {user.isLoggedIn ? 
          <>
          <LinkContainer to='/userpage'>
              <Nav.Link>
                <FontAwesomeIcon icon={faUser} />  
              </Nav.Link>
        </LinkContainer>
         <LinkContainer to='/' onClick={()=>{handleLogout()}}>
              <Nav.Link >
               Logout
              </Nav.Link>
          </LinkContainer>
          </>
          :
          <LinkContainer to='/login'>
              <Nav.Link>Login</Nav.Link>
          </LinkContainer>
    
          }
          </Nav>
      </Navbar>
    )
}

const mapStateToProps = (state:IStore) =>({
  user:state.user
});


const mapDispatchToProps = (dispatch:Dispatch)=>{
  return{
    logOut:bindActionCreators(logOut, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);