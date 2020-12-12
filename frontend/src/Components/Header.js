import React from 'react'
import {Navbar,Nav,Container, NavDropdown } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import {logoutUser} from '../actions/userActions'


import SearchBoxCompoent from '../Components/SearchBoxComponent'
import {Route} from 'react-router-dom'

import {useSelector,useDispatch} from 'react-redux'
const Header = ({history,location}) => {

  const dispatcher=useDispatch()
  console.log(history)
if(location){
  var {pathname}=location
}
console.log(pathname)
  const logoutHandler=()=>{
    
    console.log('logout');
    dispatcher(logoutUser())
    window.location.reload(false);
    
    
  }
  
  const {Loading,error,userInfo}=useSelector(state=>state.UserLogin)
  console.log("IN HEADER");
  if(!userInfo){
    console.log("ILLA ILLA");
  }
  console.log("IN HEADER");
    return (
        <header>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
            <Container>
            <LinkContainer to='/'>
  <Navbar.Brand >E-COm</Navbar.Brand>
  
  </LinkContainer>

  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">


  <Route render={({history})=> <SearchBoxCompoent history={history} ></SearchBoxCompoent>}></Route>
  
   
    <Nav className="ml-auto">
    <LinkContainer to='/cart'>
      <Nav.Link > <i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
      </LinkContainer>
     
{userInfo?(

<NavDropdown title={userInfo.name} id='username'>
  <LinkContainer to='/profile'>
    <NavDropdown.Item>Profile</NavDropdown.Item>
  </LinkContainer>
  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
</NavDropdown>
):    (<LinkContainer to='/login'>
      <Nav.Link ><i className='fas fa-user'></i>  Sign In</Nav.Link>
      </LinkContainer>) }


{userInfo&&userInfo.isAdmin&&(
  <NavDropdown title="Admin" id='username'>
  <LinkContainer to='/admin/userlist'>
    <NavDropdown.Item>Users</NavDropdown.Item>
  </LinkContainer>
  <LinkContainer to='/admin/productlist'>
    <NavDropdown.Item>Products</NavDropdown.Item>
  </LinkContainer>
  <LinkContainer to='/admin/orderlist'>
    <NavDropdown.Item>Orders</NavDropdown.Item>
  </LinkContainer>
  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
</NavDropdown>
)}
      
    </Nav>
   
  </Navbar.Collapse>
  </Container>
</Navbar>
        </header>
    )
}
export default Header
