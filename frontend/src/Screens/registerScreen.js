import React, { useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import {Image,Form,Button,Row,Col} from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux'
import {userRegister,clearData} from '../actions/userActions'
import FormContainer from '../Components/FormContainer'
import Message from '../Components/Message'
import Loader from '../Components/Loader'

const Registerscreen = ({history,location}) => {
    const [name,setname]=useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState("123456")
    const [confirmpassword, setconfirmpassword] = useState("123456")
    const [message, setmessage] = useState(null)
   
    const dispatch = useDispatch()
   
    
    const {Loading,error,userInfo}=useSelector(state=>state.UserRegister)
    
    console.log(location.search);

    const redirect=location.search?location.search.split("=")[1]:'/'
    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        
            return () => {
                console.log("IN CLEAR");
                dispatch(clearData());
              };
        }
        
        // console.log("IN UE EFFE");
        // dispatch(userLogin("adithya@example.com","123456"))
        
            },[history,userInfo,redirect])
                console.log(location.search);
    const submithandler=(e)=>{
        setmessage(null)
        e.preventDefault()
        //DISPATH REGISTER
        // dispatch(userLogin(email,password))
        if(password!==confirmpassword){
            setmessage("Password Does not match")
        }else{
            dispatch(userRegister(name,email,password))
        }

        
        console.log("submit");

    }

    useEffect(()=>{

// console.log("IN UE EFFE");
// dispatch(userLogin("adithya@example.com","123456"))

    })
    return (
        
       <> 
       
       <FormContainer>
       {message&&<Message variant='danger'>{message}</Message>}
       {error&&<Message variant='danger'>{error}</Message>}
    
       {Loading&&<Loader></Loader>}
  <h1>Sign Up </h1>
  <Form onSubmit={submithandler}    >
  <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control 
          type='name'
           placeholder="Enter User Name" 
           value={name} 
           onChange={(e)=>setname(e.target.value)}>

           </Form.Control>
      </Form.Group>
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
      <Form.Group controlId='confirmpassword'>
          <Form.Label>confirmPassword </Form.Label>
          <Form.Control 
          type='password'
           placeholder="Enter Confirm Password" 
           value={confirmpassword} 
           onChange={(e)=>setconfirmpassword(e.target.value)}>

           </Form.Control>
      </Form.Group>
      <Button variant='primary' type='submit'>Register In</Button>

  </Form>
  <Row className='py-3'>
  <Col>Have an Account ? <Link to={redirect?`/login?redirect=${redirect}`:'/login' }>Login</Link></Col>



  </Row>
  </FormContainer>
       </>
 

  
        
    )
}

export default Registerscreen
