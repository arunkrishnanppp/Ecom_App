import React,{useEffect,useState} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Table,Button,Row,Col} from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import {GetOrders} from '../actions/orderActions'


import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'















const OrderListScreen = ({history}) => {

    const dispatch = useDispatch()

    const OrderList=useSelector(state=>state.OrderList)
    const {Loading,error,orders}=OrderList

    const UserLogin=useSelector(state=>state.UserLogin)
    const {userInfo}=UserLogin

    

    useEffect(()=>{
        if(userInfo&&userInfo.isAdmin){
        dispatch(GetOrders())
        }else{
            history.push('/login')
        }
        


        // if(!userInfo.isAdmin){
        //     history.push('/')
        // }

        
     
    },[dispatch,history])

   
    

    return (
        <>
        <Row className='align-items-center'>

            <Col>
                <h1>Orders</h1>
            </Col>
           

        </Row>
        <Row>
        <Col>
        
        {Loading?<Loader/>:error?<Message variant='danger'>{"Hello"}</Message>:
         (
             <Table striped boardered hover responsive className='tabel-sm'>
             <thead>
                 <tr>
                     <th>Order Id</th>
                     <th>UserInfo</th>
                     <th>Date</th>
                     <th>Total Price</th>
                     <th>Is Paid</th>
                     <th>Is Deleivered</th>
                   
                     
                     
                 </tr>
             </thead>
             <tbody>

             {orders.map(order=>
(
    <tr key={order._id}>
        <td>{order._id}</td>
        <td>{order.user.name}</td>
        <td>{order.createdAt.substring(1,10)}</td>
        <td>{order.totalPrice}</td>
        <td>{order.isPaid?
            (
                order.paymentResult.update_time.substring(1,10)
            ):
            (  <i className='fas fa-times' style={{color:'red'}}></i>)
        }</td>
        <td>{order.isDelivered?
            (
                order.deliveredAt.substring(1,10)
            ):
            (  <i className='fas fa-times' style={{color:'red'}}></i>)
        }</td>
       
       
<td>
<LinkContainer to={`/orders/${order._id}`}>

        <Button variant='light' className='btn-sm'>


            <i className="fas fa-info"></i>
            Details
        </Button>
    </LinkContainer>
   
    {/* <Button className='btn-sm' variant='danger' onClick={()=>deleteHandler(product._id,product.name)}>
<i className='fas fa-trash'></i>

    </Button> */}
</td>
    </tr>
))}

             </tbody>


             </Table>
         )}   
         </Col>
        </Row>







         
        
        </>
    )
}

export default OrderListScreen
