import React, { useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import {Image,Form,Button,Row,Col} from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux'
import {userLogin} from '../actions/userActions'
import FormContainer from '../Components/FormContainer'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import {
    BrowserRouter as Router,
    Switch,
    useLocation
  } from "react-router-dom";

const Loginscreen = ({history,location}) => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState("123456")
    const dispatch = useDispatch()
    const {Loading,error,userInfo}=useSelector(state=>state.UserLogin)
    const lastLocation = useLocation();

    const redirect=location.search?location.search.split("=")[1]:'/'
    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
        
        // console.log("IN UE EFFE");
        // dispatch(userLogin("adithya@example.com","123456"))
        
            },[history,userInfo,redirect])
                console.log(location.search);
    const submithandler=(e)=>{
        e.preventDefault()
        //DISPATH LOGIn
        dispatch(userLogin(email,password))
        const r=location.state?location.state.next:'/'
        history.push(`/login?redirectTo=${r}`);
        console.log("submit");

    }


    return (
        
       <> 
       
       <FormContainer>
       {error&&<Message variant='danger'>{error}</Message>}
       {Loading&&<Loader></Loader>}
  <h1>Sign in </h1>
  <Form onSubmit={submithandler}    >
      <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control 
          type='email'
           placeholder="Enter Email" 
           value={email} 
           onChange={(e)=>setemail(e.target.value)}>

           </Form.Control>
      </Form.Group>
      <Form.Group controlId='password'>
          <Form.Label>Password </Form.Label>
          <Form.Control 
          type='password'
           placeholder="Enter Password" 
           value={password} 
           onChange={(e)=>setpassword(e.target.value)}>

           </Form.Control>
      </Form.Group>
      <Button variant='primary' type='submit'>Sign In</Button>

  </Form>
  <Row className='py-3'>
  <Col>New Customer? <Link to={redirect?`/register?redirect=${redirect}`:'/register' }>Register</Link></Col>



  </Row>
  </FormContainer>
       </>
 

  
        
    )
}

export default Loginscreen
