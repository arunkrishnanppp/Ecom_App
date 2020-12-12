import React,{useState,useEffect} from 'react'
import {Button,Row,Col,ListGroup,Image,Card} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import axios from 'axios'
import { PayPalButton } from "react-paypal-button-v2";

import {DeliverOrder, getOrderDetails,PayOrder} from '../actions/orderActions'

import {Link} from 'react-router-dom'
import { ADMIN_ORDER_DEL_RESET, ORDER_PAY_REQ, ORDER_PAY_RESET } from '../constants/orderConstants'
const OrderDetailsScreen = ({match,history}) => {
    console.log("IN ORDER DETAIL SCREEEN");
    const UserLogin=useSelector(state=>state.UserLogin)
    const {userInfo}=UserLogin

    const [SDKReady,setSDKReady]=useState(false)

    const OrderId=match.params.id
const dispatch = useDispatch()
    const orderDetails=useSelector(state=>state.GetOrder)
    var {order,Loading,error}=orderDetails
    console.log(order);

    const orderPayDetails=useSelector(state=>state.OrderPay)
    const {success:SuccessPay,Loading:LoadingPay}=orderPayDetails



    const orderDeliveryDetails=useSelector(state=>state.OrderDelivery)
    const {success:SuccessDelivery,Loading:LoadingDelivery}=orderDeliveryDetails



        useEffect(()=>{
        
                "In use effect detail"
                if(!userInfo){
                    history.push(`/login?redirect=/login`)
                }
                if(SuccessDelivery){
                    dispatch(getOrderDetails(OrderId))
                    dispatch({type:ADMIN_ORDER_DEL_RESET})
               }
           
          
            const addPayPalScript=async()=>{
                const {data:clientId}=await axios.get('/api/config/paypal')
                console.log(clientId);
                const paypalIntScript=document.createElement('script')
                paypalIntScript.type='text/javascript'
                paypalIntScript.src=`https://www.paypal.com/sdk/js?client-id=${clientId}`
                paypalIntScript.async=true
                paypalIntScript.onload=()=>{
                    setSDKReady(true)
                }
                document.body.appendChild(paypalIntScript)
            }
          
            
            if(!order||SuccessPay){
                dispatch({type:ORDER_PAY_RESET})
                dispatch(getOrderDetails(OrderId))
              
                console.log('getordercalled');
                

            }else if(!order.isPaid){
                if(window.paypal){
                    addPayPalScript()
                }else{
                    setSDKReady(true)
                }

            }
           


            // if(!order || order._id !== OrderId) {

            // dispatch(getOrderDetails(OrderId))

            // }

        },[dispatch,SuccessPay,OrderId,order,SuccessDelivery,DeliverOrder])
    
        const SuccessPaymentHandler=(paymentResult)=>{
            console.log("In sumbit");
            console.log(paymentResult);
            dispatch(PayOrder(OrderId,paymentResult))
        }
       
        const makeasDelivered=()=>{
            console.log("delivered")
            dispatch(DeliverOrder(order._id))
            dispatch({type:ADMIN_ORDER_DEL_RESET})
        }
    
    return (
        Loading?<Loader/>:error?<Message variant='danger'>{error}</Message>:<>

        <h1>Order {order._id}</h1>
        <Row>
          <Col>
              <ListGroup variant='flush'>
                  <ListGroup.Item>
                      <h3>Shipping</h3>
                      <strong>Name:</strong>{order.user.name}
                      <p> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                     
                      <p>
                          <strong>Address:</strong>
                          <p>{order.shippingItems.name}</p>
                          <p>{order.shippingItems.address}</p>
                          <p>{order.shippingItems.city}</p>
                          <p>{order.shippingItems.postalCode}</p>
                          <p>{order.shippingItems.state}</p>
                          <p>{order.shippingItems.country}</p>
                      </p>
                      
                  </ListGroup.Item>

                  <ListGroup.Item>
                      <h3>Payment </h3>
                      <p>
                      <strong>Payment Method: </strong>
                          {order.paymentMethod}
                      </p>
                      {order.isPaid?<Message variant='success'>Paid At:{order.paymentResult.update_time.substring(1,10)}</Message>:<Message
                      variant="danger">
                          Not Paid
                      </Message>}
                     
                      {order.isDelivered?<Message variant='success'>Delivered At:{order.deliveredAt.substring(1,10)}</Message>:<Message
                      variant="danger">
                          Not Delivered
                      </Message>}

                  </ListGroup.Item>
                  <ListGroup.Item>
                      <h3>Order Items</h3>
                      {order.orderItems.length===0?<Message>Order Is empty</Message>:(
                          <ListGroup variant='flush'>

                              {order.orderItems.map((item,index)=>(
                                  <ListGroup.Item key={index}>
                                      <Row>
                                          <Col md={1}>
                                              <Image src={item.image} alt={item.name} fluid rounded></Image>
                                          </Col>
                                          <Col md >
                                              <Link to={`/products/${item.product}`}>
                                                  {item.name}
                                              </Link>
                                          </Col>
                                          <Col md={4}>
                                              {item.qty}X ${item.price}={item.qty*item.price}
                                          </Col>

                                        
                                      </Row>

                                  </ListGroup.Item>
                              ))}
                          </ListGroup>
                      )}
                  </ListGroup.Item>
              </ListGroup>
          </Col>
          <Col md={4}>
              <Card >
                  <ListGroup variant="fluid">
<ListGroup.Item>
    Order Summery
</ListGroup.Item>
<ListGroup.Item>
    <Row>
    <Col>Items</Col>
        <Col>
            ${order.itemsPrice}
        </Col>
    </Row>
</ListGroup.Item>

<ListGroup.Item>
    <Row>
    <Col>Shipping</Col>
        <Col>
            ${order.shippingPrice}
        </Col>
    </Row>
</ListGroup.Item>
<ListGroup.Item>
    <Row>
    <Col>Tax</Col>
        <Col>
            ${order.taxPrice}
        </Col>
    </Row>
</ListGroup.Item>
<ListGroup.Item>
    <Row>
    <Col>Total</Col>
        <Col>
           <strong style={{ fontWeight: 'bold'} }>${order.totalPrice}</strong> 
        </Col>
    </Row>


</ListGroup.Item>

{!order.isPaid&&
<ListGroup.Item>
{LoadingPay&&<Loader/>}
{!SDKReady?<Loader/>:
<PayPalButton amount={order.totalPrice} onSuccess={SuccessPaymentHandler}></PayPalButton>
}

</ListGroup.Item>}
<ListGroup.Item>
{userInfo.isAdmin&&(
                          order.isPaid&&(
                          !order.isDelivered&&
                      <Button 
                      className='btn btn-block'
                      onClick={makeasDelivered}>MARK AS DELIVERED</Button>))
                      }
</ListGroup.Item>

                  </ListGroup>  
              </Card>
          </Col>
      </Row>
        </>  
    )
}

export default OrderDetailsScreen
