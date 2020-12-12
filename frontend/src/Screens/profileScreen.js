import React, { useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import {Image,Form,Button,Row,Col, ListGroup, Table} from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux'
import {getUserDetails,clearData,updateUserProfile, updateUserName} from '../actions/userActions'
import FormContainer from '../Components/FormContainer'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { GetMyOrders } from '../actions/orderActions'
import {LinkContainer} from 'react-router-bootstrap'

export const Profilescreen = ({history,location}) => {
    const [name,setname]=useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState("123456")
    const [confirmpassword, setconfirmpassword] = useState("123456")
    const [message, setmessage] = useState(null)
   
    const dispatch = useDispatch()

       
    const userLogin=useSelector(state=>state.UserLogin)
    const {userInfo}=userLogin

   
    const userDetails=useSelector(state=>state.UserDetails)
    const {Loading,error,user}=userDetails

    const updatedUser=useSelector(state=>state.UserUpdateProfile)
    const {success}=updatedUser

    const MyOrderList=useSelector(state=>state.MyOrderList)
    const {Loading:LoadingOrders,error:ordersLoadingError,orders}=MyOrderList

    console.log(orders,LoadingOrders,ordersLoadingError);

console.log(orders);
    
    

    
    useEffect(()=>{
        console.log('in use effect');
        if(!userInfo){
            history.push(`/login?redirect=/profile`)
        
            
        }
        else{
            dispatch(GetMyOrders())
            
            if(!user.name){
                console.log("IN ELSE IF");
                dispatch(getUserDetails("profile"))
               
            }else{
                setname(user.name)
                setemail(user.email)
            }
        }
        // console.log("IN UE EFFE");
        // dispatch(userLogin("adithya@example.com","123456"))
        
            },[history,user,dispatch])
                console.log(location.search);
    const submithandler=(e)=>{
        setmessage(null)
        e.preventDefault()
        //DISPATH REGISTER
        // dispatch(userLogin(email,password))
        if(password!==confirmpassword){
            setmessage("Password Does not match")
        }else{
            //dispath
            dispatch(updateUserProfile({id:user._id,name,email,password}))
            dispatch(updateUserName(name))
            // dispatch(getUserDetails("profile"))
        }

        
        console.log("submit");

    }

    return (
       <Row>
           <Col md={3}>
           {message&&<Message variant='danger'>{message}</Message>}
       {error&&<Message variant='danger'>{error}</Message>}

       {success&&<Message variant='success'>success</Message>}
    
    
       {Loading&&<Loader></Loader>}
  <h2>User Prodile </h2>
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
      <Button variant='primary' type='submit'>Update In</Button>

  </Form>
           </Col>
           <Col md={9}>
           <h2>MY ORDERS</h2>

           {LoadingOrders?<Loader/>:
           ordersLoadingError?<Message variant='danger'>{ordersLoadingError}</Message>:
           
           (
              <Table striped 
              boarders
              hover
              responsive
              className='table-sm'>

                  <thead>
                      <tr>
                          <th>ID</th>
                          <th>DATE</th>
                          <th>TOTAL</th>
                          <th>PAID</th>
                          <th>DELIVERED</th>
                          <th></th>
                      </tr>
                  </thead>
                  <tbody>
                      {orders.map(order=>(
                         
                         
                          <tr key={order._id}
                          >
                          <td>{order._id}</td>
                              <td>{order.createdAt.substring(1, 10)}</td>
                              <td>{order.totalPrice}</td>
                              <td>{order.isPaid?order.paidAt.substring(1, 10):(
                                  <i className='fas fa-times' style={{color:'red',padding:'10px'}}></i>
                              )}</td>
                              <td>{order.isDelivered?order.deliveredAt.substring(0,10):(
                                  <i className='fas fa-times' style={{color:'red',padding:'10px'}}></i>
                              )}</td>

                             
                              <td><LinkContainer to={`/orders/${order._id}`}>
                                  <Button  className='btn-sm' variant='light'>Details</Button>
                              </LinkContainer></td>
                          </tr>
                      ))} 
                  </tbody>
              </Table>
           )}
           
           </Col>
       </Row>
  
        
    )
}

