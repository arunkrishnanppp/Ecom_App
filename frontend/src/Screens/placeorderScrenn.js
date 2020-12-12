import React,{useEffect} from 'react'
import {Button,Row,Col,ListGroup,Image,Card} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import CheckOutSteps from '../Components/checkOutSteps'
import {PlaceOrder} from '../actions/orderActions'

import {Link} from 'react-router-dom'
const PlaceorderScrenn = ({history}) => {
const currentUser=useSelector(state=>state.UserLogin)
console.log(currentUser.userInfo);
    const dispatch = useDispatch()
    const cart=useSelector(state=>state.Cart)
    const {cartItems,paymentMethod,shippingAddress}=cart

    console.log(paymentMethod, "is the payment method")
   
    
    
    console.log("IN PLACE ORDER");

    //calacuated prices

    const addDecimals=(num)=>{
        return (Math.round(num*100)/100).toFixed(2)
    }
        const itemsPrice=addDecimals(cartItems.reduce((acc,item)=>acc+item.price*item.qty,0))
        const shippingPrice=addDecimals(itemsPrice>200?0:100)
        const taxPrice=addDecimals(Number((.15*itemsPrice).toFixed(2)))
        const totalPrice=addDecimals(Number(itemsPrice)+Number(shippingPrice)+Number(taxPrice))
        console.log(typeof Number(itemsPrice))

        const orderCreate=useSelector(state=>state.Order)
        const {order,success,error}=orderCreate

        const UserLogin=useSelector(state=>state.UserLogin)
        const {userInfo}=UserLogin

        //adding to cart Object
        cart.itemsPrice=Number(itemsPrice)
        cart.shippingPrice=Number(shippingPrice)
        cart.taxPrice=Number(taxPrice)
        cart.totalPrice=Number(totalPrice)


        console.log(cart);
        useEffect(()=>{
            if(!userInfo){
                history.push('/login?redirect=placeorder')
            }

            if(success){
                dispatch({type:"ORDER_CREATE_RESET"})
            history.push(`/orders/${order._id}`)
            }

            
        },[history,success])
    
    const submithandler=()=>{
        console.log("SUBMIT");
        const order={
            orderItems:cart.cartItems,
            shippingAddress:cart.shippingAddress,
            paymentMethod:cart.paymentMethod,
            itemsPrice:cart.itemsPrice,
            shippingPrice:cart.shippingPrice,
            taxPrice:cart.taxPrice,
            totalPrice:cart.totalPrice,
            user:userInfo
        };
        console.log(order)
        dispatch({type:"ORDER_DETAILS_RESET"})
        dispatch(
           
           
          PlaceOrder(order)
            
        )
    }
    return (
        <>
      <CheckOutSteps step1 step2 step3 step4/>
      <Row>
          <Col>
              <ListGroup variant='flush'>
                  <ListGroup.Item>
                      <h3>Shipping</h3>
                      <p>
                          <strong>Address:</strong>
                          {shippingAddress.address},
                          {shippingAddress.city},
                          {shippingAddress.postalCode},
                          {shippingAddress.state},
                          {shippingAddress.country}
                      </p>
                  </ListGroup.Item>
                  <ListGroup.Item>
                      <h3>Payment </h3>
                      <p>
                      <strong>Payment Method: </strong>
                          {paymentMethod}
                      </p>

                  </ListGroup.Item>
                  <ListGroup.Item>
                      <h3>Order Items</h3>
                      {cartItems.length===0?<Message>Your Cart IS Empty</Message>:(
                          <ListGroup variant='flush'>

                              {cartItems.map((item,index)=>(
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
            ${itemsPrice}
        </Col>
    </Row>
</ListGroup.Item>

<ListGroup.Item>
    <Row>
    <Col>Shipping</Col>
        <Col>
            ${shippingPrice}
        </Col>
    </Row>
</ListGroup.Item>
<ListGroup.Item>
    <Row>
    <Col>Tax</Col>
        <Col>
            ${taxPrice}
        </Col>
    </Row>
</ListGroup.Item>
<ListGroup.Item>
    <Row>
    <Col>Total</Col>
        <Col>
           <strong style={{ fontWeight: 'bold'} }>${totalPrice}</strong> 
        </Col>
    </Row>
</ListGroup.Item>
{error&&<Message variant='danger'>{error}</Message>}
<ListGroup.Item>
    <Button  type="button" className='btn-block' disabled={cartItems.length===0} onClick={submithandler}>Place Order</Button>
</ListGroup.Item>

                  </ListGroup>  
              </Card>
          </Col>
      </Row>
            
        </>
    )
}

export default PlaceorderScrenn
